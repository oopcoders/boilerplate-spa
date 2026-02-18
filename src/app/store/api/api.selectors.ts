import { createFeatureSelector, createSelector } from '@ngrx/store';
import { API_FEATURE_KEY } from '../store.keys';
import type { ApiFeatureState } from './api.models';

export const selectApi = createFeatureSelector<ApiFeatureState>(API_FEATURE_KEY);

export const selectApiLogin = createSelector(selectApi, (s) => s.login);

export const selectApiLoginLoading = createSelector(selectApiLogin, (r) => r.loading);
export const selectApiLoginError = createSelector(selectApiLogin, (r) => r.error);
export const selectApiLoginResponse = createSelector(selectApiLogin, (r) => r.data);

export const selectLoggedInUser = createSelector(
  selectApiLoginResponse,
  (login) => login?.user ?? null
);

export const selectIsLoggedIn = createSelector(
  selectApiLoginResponse,
  (login) => !!login?.accessToken
);

export const selectApiRegister = createSelector(selectApi, (s) => s.register);

export const selectApiRegisterLoading = createSelector(selectApiRegister, (r) => r.loading);
export const selectApiRegisterError = createSelector(selectApiRegister, (r) => r.error);
export const selectApiRegisterUser = createSelector(selectApiRegister, (u) => u.data);

export const selectApiForgotPassword = createSelector(selectApi, (s) => s.forgotPassword);

export const selectApiForgotPasswordLoading = createSelector(selectApiForgotPassword, (r) => r.loading);
export const selectApiForgotPasswordError = createSelector(selectApiForgotPassword, (r) => r.error);
export const selectApiForgotPasswordData = createSelector(selectApiForgotPassword, (u) => u.data);

export const selectApiResetPassword = createSelector(selectApi, (s) => s.resetPassword);

export const selectApiResetPasswordLoading = createSelector(selectApiResetPassword, (r) => r.loading);
export const selectApiResetPasswordError = createSelector(selectApiResetPassword, (r) => r.error);
export const selectApiResetPasswordData = createSelector(selectApiResetPassword, (u) => u.data);


