import { Injectable, inject } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiLoggedInUser } from '../../store';

// Assumption: backend returns new tokens here
export type RefreshResponse = { accessToken: string; refreshToken?: string };

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private readonly http: HttpClient;
  private readonly baseUrl = 'https://localhost:5001/api';

  constructor(httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  refresh(refreshToken: string): Observable<RefreshResponse> {
    // Assumption: refresh token is sent in body. If your backend uses HttpOnly cookies,
    // you’d add { withCredentials: true } instead and omit the refreshToken in body.
    return this.http.post<RefreshResponse>(`${this.baseUrl}/auth/refresh`, { refreshToken });
  }

  me(accessToken: string): Observable<ApiLoggedInUser> {
    return this.http.get<ApiLoggedInUser>(`${this.baseUrl}/auth/me`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
    });
  }
}
