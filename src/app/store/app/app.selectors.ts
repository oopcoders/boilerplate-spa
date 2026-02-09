import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY } from '../store.keys';
import type { AppFeatureState } from './app.models';

export const selectApp = createFeatureSelector<AppFeatureState>(APP_FEATURE_KEY);

export const selectAuth = createSelector(selectApp, (s) => s.auth);
export const selectAppIsReady = createSelector(selectAuth, (auth) => auth.isReady);
