import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiActions, AppActions } from '../../store';
import { TokenService } from './token.service';
import { JwtService } from './jwt.service';
import { AuthApi } from './auth-api.service';
import { AuthRefreshService } from './auth-refresh.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthBootstrapService {
  private readonly store = inject(Store);
  private readonly tokens = inject(TokenService);
  private readonly jwt = inject(JwtService);
  private readonly authApi = inject(AuthApi);
  private readonly refresh = inject(AuthRefreshService);

  async init(): Promise<void> {
    // Multi-tab support: if another tab logs out or refreshes tokens, react here
    this.listenToStorageEvents();

    const { accessToken, refreshToken } = this.tokens.getTokens();

    if (!accessToken) {
      this.store.dispatch(ApiActions.sessionCleared());
      this.store.dispatch(AppActions.init());
      return;
    }

    try {
      // If JWT and expiring soon, refresh before /me
      if (this.jwt.isProbablyJwt(accessToken) && this.jwt.isExpired(accessToken, 60)) {
        await firstValueFrom(this.refresh.refreshOnce());
      }

      const liveAccessToken = this.tokens.getAccessToken();
      if (!liveAccessToken) throw new Error('Access token missing after refresh attempt.');

      const user = await firstValueFrom(this.authApi.me(liveAccessToken));

      // Rehydrate NgRx session
      this.store.dispatch(
        ApiActions.sessionRestored({
          session: {
            accessToken: liveAccessToken,
            refreshToken: this.tokens.getRefreshToken() ?? (refreshToken ?? ''),
            user,
          },
        }),
      );
    } catch {
      // If /me failed (401 or network), try refresh once if refresh token exists
      try {
        if (this.tokens.getRefreshToken()) {
          await firstValueFrom(this.refresh.refreshOnce());
          const liveAccessToken = this.tokens.getAccessToken();

          if (liveAccessToken) {
            const user = await firstValueFrom(this.authApi.me(liveAccessToken));
            this.store.dispatch(
              ApiActions.sessionRestored({
                session: {
                  accessToken: liveAccessToken,
                  refreshToken: this.tokens.getRefreshToken() ?? '',
                  user,
                },
              }),
            );
          } else {
            throw new Error('No access token after refresh.');
          }
        } else {
          throw new Error('No refresh token available.');
        }
      } catch {
        this.tokens.clear();
        this.store.dispatch(ApiActions.sessionCleared());
      }
    } finally {
      this.store.dispatch(AppActions.init());
    }
  }

  private listenToStorageEvents(): void {
    window.addEventListener('storage', (e: StorageEvent) => {
      if (!e.key) return;
      if (e.key !== 'accessToken' && e.key !== 'refreshToken') return;

      // If tokens were removed in another tab, reflect logout immediately
      const accessToken = this.tokens.getAccessToken();
      if (!accessToken) {
        this.store.dispatch(ApiActions.sessionCleared());
        return;
      }

      // If access token changed (e.g., rotated refresh in another tab),
      // update state without forcing a network call:
      // (Optionally: trigger a background /me refresh if you want.)
      this.store.dispatch(
        ApiActions.sessionTokensUpdated({
          accessToken,
          refreshToken: this.tokens.getRefreshToken(),
        }),
      );
    });
  }
}
