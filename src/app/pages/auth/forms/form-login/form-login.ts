import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApiActions, selectApiLoginError, selectApiLoginLoading, selectIsLoggedIn } from '../../../../store';
import { MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-login',
  imports: [
    MatDialogModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './form-login.html',
  styleUrl: './form-login.scss',
})
export class FormLogin {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);

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
}
