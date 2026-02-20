import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { JwtService } from './jwt.service';
import { AuthRefreshService } from './auth-refresh.service';
import { AUTH_RETRY_COUNT, SKIP_AUTH } from './http-context.tokens';
import { Store } from '@ngrx/store';
import { ApiActions } from '../../store';

function withAuth(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.context.get(SKIP_AUTH)) return next(req);

    const tokens = inject(TokenService);
    const jwt = inject(JwtService);
    const refresh = inject(AuthRefreshService);
    const store = inject(Store);

    const accessToken = tokens.getAccessToken();

    // Optional proactive refresh: only if token is JWT and near expiry
    const shouldRefreshFirst = !!accessToken && jwt.shouldRefreshSoon(accessToken, 60);

    const send = (token: string | null) => next(token ? withAuth(req, token) : req);

    const handleAuthFailure = (err: unknown) => {
        tokens.clear();
        store.dispatch(ApiActions.logout()); // or SessionCleared if you don’t want logout snackbar
        return throwError(() => err);
    };

    const tryRefreshThenRetry = () => {
        const retryCount = req.context.get(AUTH_RETRY_COUNT);
        if (retryCount >= 1) return handleAuthFailure(new Error('Auth retry exceeded.'));

        if (!tokens.getRefreshToken()) return handleAuthFailure(new Error('No refresh token.'));

        return refresh.refreshOnce().pipe(
            switchMap(() => {
                const newToken = tokens.getAccessToken();
                if (!newToken) return handleAuthFailure(new Error('No access token after refresh.'));
                const retriedReq = req.clone({ context: req.context.set(AUTH_RETRY_COUNT, retryCount + 1) });
                return next(withAuth(retriedReq, newToken));
            }),
            catchError((err) => handleAuthFailure(err)),
        );
    };

    if (shouldRefreshFirst) {
        return refresh.refreshOnce().pipe(
            switchMap(() => send(tokens.getAccessToken())),
            catchError(handleAuthFailure),
        );
    }

    return send(accessToken).pipe(
        catchError((err: unknown) => {
            if (!(err instanceof HttpErrorResponse)) return throwError(() => err);
            if (err.status !== 401) return throwError(() => err);

            return tryRefreshThenRetry();
        }),
    );
};

