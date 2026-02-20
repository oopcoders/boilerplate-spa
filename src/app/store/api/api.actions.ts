import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiLoginPayload, ApiAuthResponse, ApiRegisterPayload, ApiLoginUser, ApiResetPasswordPayload, ApiResetPasswordResponse, ApiForgotPasswordPayload, ApiForgotPasswordResponse } from './api.models';

export const ApiActions = createActionGroup({
  source: 'Api',
  events: {
    'Login': props<{ payload: ApiLoginPayload }>(),
    'Login Success': props<{ response: ApiLoginUser }>(),
    'Login Failure': props<{ error: string }>(),
    'Register': props<{ payload: ApiRegisterPayload }>(),
    'Register Success': props<{ response: ApiAuthResponse }>(),
    'Register Failure': props<{ error: string }>(),
    'Logout': emptyProps,

    'Reset Password': props<{ payload: ApiResetPasswordPayload }>(),
    'Reset Password Success': props<{ response: ApiResetPasswordResponse }>(),
    'Reset Password Failure': props<{ error: string }>(),
    'Forgot Password': props<{ payload: ApiForgotPasswordPayload }>(),
    'Forgot Password Success': props<{ response: ApiForgotPasswordResponse }>(),
    'Forgot Password Failure': props<{ error: string }>(),

    // Add near existing events
    'Session Restored': props<{ session: ApiLoginUser }>(),
    'Session Tokens Updated': props<{ accessToken: string; refreshToken: string | null }>(),
    'Session Cleared': emptyProps(),

  },
});
