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

export interface ApiLoginUser {
  id: string;
  email: string;
  displayName: string;
  token: string;
}

export interface ApiAuthResponse {
  user: ApiLoginUser;
  token: string;
}

export interface ApiUserResponse {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
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
  users: ApiRequestState<ApiUserResponse[]>;
  user: ApiRequestState<ApiUserResponse>
}

export const initialApiFeatureState: ApiFeatureState = {
  login: createInitialRequestState<ApiLoginUser>(),
  register: createInitialRequestState<ApiAuthResponse>(),
  forgotPassword: createInitialRequestState<ApiForgotPasswordResponse>(),
  resetPassword: createInitialRequestState<ApiResetPasswordResponse>(),
  users: createInitialRequestState<ApiUserResponse[]>(),
  user: createInitialRequestState<ApiUserResponse>()
};
