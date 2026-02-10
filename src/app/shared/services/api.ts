import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLoginPayload, ApiAuthResponse, ApiRegisterPayload, ApiUserResponse, ApiLoginUser, ApiForgotPasswordPayload, ApiForgotPasswordResponse, ApiResetPasswordPayload, ApiResetPasswordResponse } from '../../store';



@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:5001/api';

  login(payload: ApiLoginPayload) {
    return this.http.post<ApiLoginUser>(`${this.baseUrl}/auth/login`, payload);
  }

  register(payload: ApiRegisterPayload) {
    return this.http.post<ApiAuthResponse>(`${this.baseUrl}/auth/register`, payload);
  }

  forgotPassword(payload: ApiForgotPasswordPayload) {
    return this.http.post<ApiForgotPasswordResponse>(`${this.baseUrl}/auth/forgot-password`, payload);
  }

  resetPassword(payload: ApiResetPasswordPayload) {
    return this.http.post<ApiResetPasswordResponse>(`${this.baseUrl}/auth/reset-password`, payload);
  }

  users() {
    return this.http.get<ApiUserResponse[]>(`${this.baseUrl}/users`);
  }

  userById(payload: string) {
    return this.http.get<ApiUserResponse>(`${this.baseUrl}/users/${payload}`);
  }

}
