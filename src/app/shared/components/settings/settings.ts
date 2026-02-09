import { Component, computed, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiActions, selectApiLoginUser, selectIsLoggedIn } from '../../../store';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-settings',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {

  private store = inject(Store);
  loggedInUser = this.store.selectSignal(selectApiLoginUser);
  user = computed(() => this.loggedInUser());

  constructor() {
    effect(() => {
      console.log('User updated:', this.user());
    });
  }
  logout(): void {
    this.store.dispatch(ApiActions.logout())
  }

}
