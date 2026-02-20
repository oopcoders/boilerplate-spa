import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, take, filter } from 'rxjs';
import { selectAppIsReady, selectIsLoggedIn } from '../../store';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return combineLatest([store.select(selectAppIsReady), store.select(selectIsLoggedIn)]).pipe(
    filter(([ready]) => !!ready),
    take(1),
    map(([, isLoggedIn]) => {
      if (!isLoggedIn) {
        router.navigate(['/']);
        return false;
      }
      return true;
    }),
  );
};
