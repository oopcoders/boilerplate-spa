export interface ApiRequestState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

export function createInitialRequestState<T>(): ApiRequestState<T> {
  return { loading: false, error: null, data: null };
}

/** Login DTOs (keep here since it's an API concern) */
export interface ApiLoginPayload {
  email: string;
  password: string;
}

export interface ApiLoggedInUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface ApiLoginUser {
  accessToken: string;
  refreshToken: string;
  user: ApiLoggedInUser;
}


export interface ApiAuthResponse {
  user: ApiLoginUser;
  token: string;
}

export interface ApiRegisterPayload extends ApiLoginPayload {
  displayName: string;
}

export interface ApiForgotPasswordPayload {
  email: string
}

export interface ApiForgotPasswordResponse {
  message: string
}

export interface ApiResetPasswordPayload {
  email: string,
  token: string,
  newPassword: string
}

export interface ApiResetPasswordResponse {
  message: string
}

export interface ApiFeatureState {
  login: ApiRequestState<ApiLoginUser>;
  register: ApiRequestState<ApiAuthResponse>;
  forgotPassword: ApiRequestState<ApiForgotPasswordResponse>;
  resetPassword: ApiRequestState<ApiResetPasswordResponse>;
}

export const initialApiFeatureState: ApiFeatureState = {
  login: createInitialRequestState<ApiLoginUser>(),
  register: createInitialRequestState<ApiAuthResponse>(),
  forgotPassword: createInitialRequestState<ApiForgotPasswordResponse>(),
  resetPassword: createInitialRequestState<ApiResetPasswordResponse>()
};
