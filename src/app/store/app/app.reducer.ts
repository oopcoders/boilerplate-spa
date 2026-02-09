import { Action, createReducer, on } from '@ngrx/store';
import { AppActions } from './app.actions';
import { type AppFeatureState, initialAppFeatureState } from './app.models';

const reducerInternal = createReducer(
  initialAppFeatureState,

  // placeholder handler
  on(AppActions.init, (state) => ({
    ...state,
    auth: { ...state.auth, isReady: true },
  })),
);

export function appReducer(state: AppFeatureState | undefined, action: Action): AppFeatureState {
  return reducerInternal(state ?? initialAppFeatureState, action);
}
