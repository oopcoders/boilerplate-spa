import { Component, computed, inject, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { ApiActions, selectApiUsersData, selectApiUsersError, selectApUsersLoading } from '../../../store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';

export interface UserVm {
  id: string;
  name: string;
  email: string;
  createdAt?: string; // optional for now
}

@Component({
  selector: 'app-users-list',
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatProgressSpinnerModule, RouterLink],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  // Columns for mat-table
  displayedColumns: string[] = ['username', 'email', 'actions'];

  private store = inject(Store);
  private readonly router = inject(Router);

  // ✅ Signals from store (nice for templates)
  users = this.store.selectSignal(selectApiUsersData);
  loading = this.store.selectSignal(selectApUsersLoading);
  error = this.store.selectSignal(selectApiUsersError);

  // Optional: derived view model
  hasUsers = computed(() => (this.users()?.length ?? 0) > 0);

  ngOnInit(): void {
    // ✅ load users on page entry
    this.store.dispatch(ApiActions.loadUsers());
  }

  refresh(): void {
    this.store.dispatch(ApiActions.loadUsers());
  }

  viewUser(userId: string): void {
    // Later: router navigation. For now just log.
    console.log('View user clicked:', userId);
  }
}
