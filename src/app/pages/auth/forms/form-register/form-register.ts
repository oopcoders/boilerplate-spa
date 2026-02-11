import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiActions, ApiAuthResponse, selectApiRegisterError, selectApiRegisterLoading, selectApiRegisterUser } from '../../../../store';
import { Store } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { passwordsMatchValidator } from '../../../../shared/validators/passwords-match-validator';

@Component({
  selector: 'app-form-register',
  imports: [MatDialogModule, AsyncPipe, ReactiveFormsModule, MatInputModule,
    MatFormFieldModule, MatButtonModule, MatProgressSpinnerModule, JsonPipe],
  templateUrl: './form-register.html',
  styleUrl: './form-register.scss',
})
export class FormRegister {

  private readonly fb = inject(FormBuilder);

  private store = inject(Store);

  error$: Observable<string | null> = of(null);
  loading$: Observable<boolean> = of(false);
  user$: Observable<ApiAuthResponse | null> = of(null);

  @Output() completed = new EventEmitter<void>();

  readonly form = this.fb.nonNullable.group(
    {
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator('password', 'confirmPassword') }
  );

  ngOnInit(): void {
    this.error$ = this.store.select(selectApiRegisterError);
    this.loading$ = this.store.select(selectApiRegisterLoading);
    this.user$ = this.store.select(selectApiRegisterUser);

  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue(); // <-- typed as all strings (no undefined)

    this.store.dispatch(
      ApiActions.register({
        payload: {
          displayName: raw.displayName,
          email: raw.email,
          password: raw.password
        },
      })
    );

    this.completed.emit();
  }
}
