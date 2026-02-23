import { Component, computed, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiActions, selectLoggedInUser } from '../../../store';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-settings',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  private store = inject(Store);
  theme = inject(ThemeService);

  loggedInUser = this.store.selectSignal(selectLoggedInUser);
  user = computed(() => this.loggedInUser());

  constructor() {
    effect(() => {
      console.log('User updated:', this.user());
    });
  }

  logout(): void {
    this.store.dispatch(ApiActions.logout());
  }
}