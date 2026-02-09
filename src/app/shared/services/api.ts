import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLoginPayload, ApiAuthResponse, ApiRegisterPayload, ApiUserResponse, ApiLoginUser } from '../../store';



@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:5001/api';

  login(payload: ApiLoginPayload) {
    return this.http.post<ApiLoginUser>(`${this.baseUrl}/account/login`, payload);
  }

  register(payload: ApiRegisterPayload) {
    return this.http.post<ApiAuthResponse>(`${this.baseUrl}/account/register`, payload);
  }

  users() {
    return this.http.get<ApiUserResponse[]>(`${this.baseUrl}/users`);
  }

  userById(payload: string) {
    return this.http.get<ApiUserResponse>(`${this.baseUrl}/users/${payload}`);
  }

}
