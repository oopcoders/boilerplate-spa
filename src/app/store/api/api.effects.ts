import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ApiActions } from './api.actions';
import { Api } from '../../shared/services/api';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

function toErrorMessage(err: unknown): string {
  if (!err) return 'Login failed.';
  if (typeof err === 'string') return err;

  const anyErr = err as any;
  const nested = anyErr?.error;

  if (typeof nested === 'string') return nested;
  if (nested?.message) return String(nested.message);

  const errors = nested?.errors;
  if (errors && typeof errors === 'object') {
    const firstKey = Object.keys(errors)[0];
    const firstVal = errors[firstKey];
    if (Array.isArray(firstVal) && typeof firstVal[0] === 'string') return firstVal[0];
  }

  if (anyErr?.message) return String(anyErr.message);
  return 'Login failed.';
}

@Injectable()
export class ApiEffects {
  private actions$ = inject(Actions);
  private api = inject(Api);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.login),
      switchMap(({ payload }) =>
        this.api.login(payload).pipe(
          map((response) => ApiActions.loginSuccess({ response })),
          catchError((err) => of(ApiActions.loginFailure({ error: toErrorMessage(err) }))),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.register),
      switchMap(({ payload }) =>
        this.api.register(payload).pipe(
          map((response) => ApiActions.registerSuccess({ response })),
          catchError((err) => of(ApiActions.registerFailure({ error: toErrorMessage(err) }))),
        ),
      ),
    ),
  );

  // ✅ Persist token on successful login
  persistToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ApiActions.loginSuccess),
        tap(({ response }) => {
          localStorage.setItem('token', response.token);
        })
      ),
    { dispatch: false }
  );

  // ✅ Logout = side effect only
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ApiActions.logout, ApiActions.loginFailure),
        tap(() => {
          localStorage.removeItem('token');
        })
      ),
    { dispatch: false }
  );

  logoutRecheckRoute$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ApiActions.logout),
        tap(() => void this.router.navigateByUrl(this.router.url, { replaceUrl: true }))
      ),
    { dispatch: false }
  );

  loginSuccessSnack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ApiActions.loginSuccess),
        tap(() => {
          this.snackBar.dismiss();
          this.snackBar.open('✅ Logged in successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snack-success'],
          });
        })
      ),
    { dispatch: false }
  );

  registerSuccessSnack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ApiActions.registerSuccess),
        tap(() => {
          this.snackBar.dismiss();
          this.snackBar.open('🎉 Account created successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snack-success'],
          });
        })
      ),
    { dispatch: false }
  );

  logoutSuccessSnack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ApiActions.logout),
        tap(() => {
          this.snackBar.dismiss();
          this.snackBar.open('👋 You have been logged out', 'Close', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snack-success'],
          });
        })
      ),
    { dispatch: false }
  );

  loginFailureSnack$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ApiActions.loginFailure),
        tap(({ error }) => {
          this.snackBar.dismiss();
          this.snackBar.open(`❌ ${error}`, 'Close', {
            duration: 3500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snack-error'],
          });
        })
      ),
    { dispatch: false }
  );




  // USERS

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.loadUsers),
      switchMap(() =>
        this.api.users().pipe(
          map((response) => ApiActions.loadUsersSuccess({ response })),
          catchError((err) => of(ApiActions.loadUsersFailure({ error: toErrorMessage(err) }))),
        ),
      ),
    ),
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApiActions.loadUser),
      switchMap((action) =>
        this.api.userById(action.payload).pipe(
          map((response) => ApiActions.loadUserSuccess({ response })),
          catchError((err) => of(ApiActions.loadUserFailure({ error: toErrorMessage(err) }))),
        ),
      ),
    ),
  );
}
