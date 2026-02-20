import { Injectable } from '@angular/core';

export type StoredTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

@Injectable({ providedIn: 'root' })
export class TokenService {
  // Single source of truth for storage keys
  private readonly ACCESS_KEY = 'accessToken';
  private readonly REFRESH_KEY = 'refreshToken';

  getTokens(): StoredTokens {
    return {
      accessToken: this.get(this.ACCESS_KEY),
      refreshToken: this.get(this.REFRESH_KEY),
    };
  }

  getAccessToken(): string | null {
    return this.get(this.ACCESS_KEY);
  }

  getRefreshToken(): string | null {
    return this.get(this.REFRESH_KEY);
  }

  setTokens(tokens: { accessToken: string; refreshToken?: string | null }): void {
    this.set(this.ACCESS_KEY, tokens.accessToken);
    if (tokens.refreshToken !== undefined) {
      this.set(this.REFRESH_KEY, tokens.refreshToken);
    }
  }

  clear(): void {
    this.remove(this.ACCESS_KEY);
    this.remove(this.REFRESH_KEY);
  }

  private get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private set(key: string, value: string | null): void {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch {
      // Optional: surface a warning/snackbar if storage is blocked
    }
  }

  private remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch { }
  }
}
