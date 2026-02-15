import { Action, createReducer, on } from '@ngrx/store';
import { ApiActions } from './api.actions';
import { type ApiFeatureState, initialApiFeatureState } from './api.models';

const reducerInternal = createReducer(
  initialApiFeatureState,

  // ---- LOGIN START ----
  on(ApiActions.login, (state) => ({
    ...state,
    login: {
      ...state.login,
      loading: true,
      error: null,
      data: state.login.data,
    },
  })),

  // ---- LOGIN SUCCESS ----
  on(ApiActions.loginSuccess, (state, { response }) => ({
    ...state,
    login: {
      loading: false,
      error: null,
      data: response,
    },
  })),

  // ---- LOGIN FAILURE (clear login state out) ----
  on(ApiActions.loginFailure, (state, { error }) => ({
    ...state,
    login: {
      loading: false,
      error,
      data: null,
    },
  })),

  // ---- REGISTER START ----
  on(ApiActions.register, (state) => ({
    ...state,
    register: {
      ...state.register,
      loading: true,
      error: null,
      data: state.register.data,
    },
  })),

  // ---- REGISTER SUCCESS ----
  on(ApiActions.registerSuccess, (state, { response }) => ({
    ...state,
    register: {
      loading: false,
      error: null,
      data: response,
    },
  })),

  // ---- REGISTER FAILURE (clear register state out) ----
  on(ApiActions.registerFailure, (state, { error }) => ({
    ...state,
    register: {
      loading: false,
      error,
      data: null,
    },
  })),

  // ---- FORGOT PASSWORD ----
  on(ApiActions.forgotPassword, (state) => ({
    ...state,
    forgotPassword: {
      loading: true,
      error: null,
      data: null,
    },
  })),

  // ---- FORGOT PASSWORD SUCCESS ----
  on(ApiActions.forgotPasswordSuccess, (state, { response }) => ({
    ...state,
    forgotPassword: {
      loading: false,
      error: null,
      data: response,
    },
  })),

  // ---- FORGOT PASSWORD FAILURE ----
  on(ApiActions.forgotPasswordFailure, (state, { error }) => ({
    ...state,
    forgotPassword: {
      loading: false,
      error,
      data: null,
    },
  })),

  // ---- RESET PASSWORD ----
  on(ApiActions.resetPassword, (state) => ({
    ...state,
    resetPassword: {
      loading: true,
      error: null,
      data: null,
    },
  })),

  // ---- RESET PASSWORD SUCCESS ----
  on(ApiActions.resetPasswordSuccess, (state, { response }) => ({
    ...state,
    resetPassword: {
      loading: false,
      error: null,
      data: response,
    },
  })),

  // ---- RESET PASSWORD FAILURE ----
  on(ApiActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    resetPassword: {
      loading: false,
      error,
      data: null,
    },
  })),

  // ---- LOGOUT USER ----
  on(ApiActions.logout, (state) => ({
    ...state,
    register: {
      loading: false,
      error: null,
      data: null,
    },
    login: {
      ...state.login,
      loading: false,
      error: null,
      data: null,
    },
  })),

  // ---- LOAD USERS SUCCESS ----
  on(ApiActions.loadUsers, (state) => ({
    ...state,
    users: {
      loading: true,
      error: null,
      data: null,
    },
  })),

  on(ApiActions.loadUsersSuccess, (state, { response }) => ({
    ...state,
    users: {
      loading: false,
      error: null,
      data: response,
    },
  })),

  // ---- LOAD USERS FAILURE ----
  on(ApiActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    users: {
      loading: false,
      error,
      data: null,
    },
  })),

  on(ApiActions.loadUser, (state) => ({
    ...state,
    users: {
      loading: true,
      error: null,
      data: null,
    },
  })),

  // ---- LOAD USER BY  SUCCESS ----
  on(ApiActions.loadUserSuccess, (state, { response }) => ({
    ...state,
    user: {
      loading: false,
      error: null,
      data: response,
    },
  })),

  // ---- LOAD USERS FAILURE ----
  on(ApiActions.loadUserFailure, (state, { error }) => ({
    ...state,
    user: {
      loading: false,
      error,
      data: null,
    },
  })),
);

export function apiReducer(state: ApiFeatureState | undefined, action: Action): ApiFeatureState {
  return reducerInternal(state ?? initialApiFeatureState, action);
}
