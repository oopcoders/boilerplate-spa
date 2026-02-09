import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiLoginPayload, ApiAuthResponse, ApiRegisterPayload, ApiUserResponse, ApiLoginUser } from './api.models';

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

    'Load Users': emptyProps,
    'Load Users Success': props<{ response: ApiUserResponse[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Load User': props<{ payload: string }>(),
    'Load User Success': props<{ response: ApiUserResponse }>(),
    'Load User Failure': props<{ error: string }>(),
  },
});
