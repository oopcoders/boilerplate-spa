import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApiActions, selectApiLoginError, selectApiLoginLoading, selectIsLoggedIn } from '../../../../store';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  imports: [
    AsyncPipe,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './form-login.html',
  styleUrl: './form-login.scss',
})
export class FormLogin {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  readonly showPassword = signal(false);

  @Output() completed = new EventEmitter<void>();

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  error$: Observable<string | null> = of(null);
  loading$: Observable<boolean> = of(false);
  isLoggedIn$: Observable<boolean> = of(false);

  ngOnInit(): void {
    this.error$ = this.store.select(selectApiLoginError);
    this.loading$ = this.store.select(selectApiLoginLoading);

    this.isLoggedIn$ = this.store.select(selectIsLoggedIn).pipe(
      tap((isLoggedIn) => {
        if (isLoggedIn) this.completed.emit();
      })
    );
  }

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue(); // strongly typed
    this.store.dispatch(ApiActions.login({ payload: raw }));
  }

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  goToPasswordReset(): void {
    this.completed.emit();
    this.router.navigateByUrl('/auth/reset-password');
  }
}
