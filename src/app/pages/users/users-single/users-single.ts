import { Component, inject, OnInit, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ApiActions } from '../../../store/api/api.actions';
import {
  selectApiUserLoading,     // <-- selector for loading single user
  selectApiUserError,
  selectApiUserData,       // <-- selector for error single user
} from '../../../store/api/api.selectors';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-single',
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatProgressSpinnerModule],
  templateUrl: './users-single.html',
  styleUrl: './users-single.scss',
})
export class UsersSingle implements OnInit {

  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  // ✅ Signals from selectors
  user = this.store.selectSignal(selectApiUserData);
  loading = this.store.selectSignal(selectApiUserLoading);
  error = this.store.selectSignal(selectApiUserError);


  ngOnInit(): void {
    // If your route is `/users/:id`
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.store.dispatch(ApiActions.loadUser({ payload: id }));
    }
  }

  reload(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(ApiActions.loadUser({ payload: id }));
    }
  }
}
