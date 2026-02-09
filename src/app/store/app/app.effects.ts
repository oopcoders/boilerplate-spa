import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AppActions } from './app.actions';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);

  // placeholder effect (no dispatch)
  init$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.init),
        tap(() => {
          // later: hydration, app startup tasks, etc.
        }),
      ),
    { dispatch: false },
  );
}
