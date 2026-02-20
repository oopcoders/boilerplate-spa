import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { finalize, map, shareReplay, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { AuthApi, RefreshResponse } from './auth-api.service';
import { Store } from '@ngrx/store';
import { ApiActions } from '../../store/api/api.actions';

@Injectable({ providedIn: 'root' })
export class AuthRefreshService {
  private readonly tokens = inject(TokenService);
  private readonly authApi = inject(AuthApi);
  private readonly store = inject(Store);

  private refreshInFlight$?: Observable<RefreshResponse>;

  refreshOnce(): Observable<RefreshResponse> {
    if (this.refreshInFlight$) return this.refreshInFlight$;

    const refreshToken = this.tokens.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available.'));
    }

    this.refreshInFlight$ = this.authApi.refresh(refreshToken).pipe(
      tap((res) => {
        this.tokens.setTokens({ accessToken: res.accessToken, refreshToken: res.refreshToken ?? null });
        this.store.dispatch(ApiActions.sessionTokensUpdated({ accessToken: res.accessToken, refreshToken: res.refreshToken ?? null }));
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
      finalize(() => (this.refreshInFlight$ = undefined)),
    );

    return this.refreshInFlight$;
  }
}
