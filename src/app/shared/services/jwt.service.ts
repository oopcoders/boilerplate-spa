import { Injectable } from '@angular/core';

type JwtPayload = Record<string, unknown> & { exp?: number };

@Injectable({ providedIn: 'root' })
export class JwtService {
  isProbablyJwt(token: string): boolean {
    return token.split('.').length === 3;
  }

  decodePayload<T extends object = JwtPayload>(token: string): T | null {
    if (!this.isProbablyJwt(token)) return null;
    try {
      const [, payloadB64] = token.split('.');
      const json = this.base64UrlDecode(payloadB64);
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }

  getExp(token: string): number | null {
    const payload = this.decodePayload<JwtPayload>(token);
    const exp = payload?.exp;
    return typeof exp === 'number' ? exp : null;
  }

  isExpired(token: string, skewSeconds = 0): boolean {
    const exp = this.getExp(token);
    if (!exp) return false; // opaque tokens or JWTs without exp: can't decide client-side
    const now = Math.floor(Date.now() / 1000);
    return now >= (exp - skewSeconds);
  }

  shouldRefreshSoon(token: string, withinSeconds: number): boolean {
    const exp = this.getExp(token);
    if (!exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return (exp - now) <= withinSeconds;
  }

  private base64UrlDecode(input: string): string {
    // base64url -> base64
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    // pad
    const pad = base64.length % 4;
    if (pad) base64 = base64.padEnd(base64.length + (4 - pad), '=');

    // atob handles base64; decodeURIComponent handles UTF-8 sequences (safe for JSON)
    const binary = globalThis.atob(base64);
    const bytes = Array.from(binary, (c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    return decodeURIComponent(bytes);
  }
}
