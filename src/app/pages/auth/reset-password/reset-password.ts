import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Api } from '../../../shared/services/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

type Mode = 'request' | 'reset';

function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value ?? '';
  const confirmPassword = group.get('confirmPassword')?.value ?? '';
  if (!password || !confirmPassword) return null;
  return password === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    // Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatSnackBarModule,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(Api);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);

  readonly emailFromUrl = signal<string | null>(null);
  readonly tokenFromUrl = signal<string | null>(null);

  readonly mode = computed<Mode>(() => {
    const email = this.emailFromUrl();
    const token = this.tokenFromUrl();
    return email && token ? 'reset' : 'request';
  });

  // REQUEST RESET (email only)
  readonly requestForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  // RESET PASSWORD (email + token + new password)
  readonly resetForm = this.fb.nonNullable.group(
    {
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      token: [{ value: '', disabled: true }, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator }
  );

  constructor() {
    // Watch query params to decide which mode to show
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: any) => {
        const email = params.get('email');
        const token = params.get('token');

        this.emailFromUrl.set(email);
        this.tokenFromUrl.set(token);

        // Pre-fill reset form if present
        if (email) this.resetForm.controls.email.setValue(email);
        if (token) this.resetForm.controls.token.setValue(token);
      });
  }

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  submitRequest(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    const email = this.requestForm.getRawValue().email;

    this.loading.set(true);

    //dispatch action
  }

  submitReset(): void {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    // email/token are disabled controls, so use getRawValue()
    const raw = this.resetForm.getRawValue();

    const payload = {
      email: raw.email,
      token: raw.token,
      newPassword: raw.password,
    };

    this.loading.set(true);
    //Dispatch action
  }

  get requestEmailCtrl() {
    return this.requestForm.controls.email;
  }

  get passwordCtrl() {
    return this.resetForm.controls.password;
  }

  get confirmPasswordCtrl() {
    return this.resetForm.controls.confirmPassword;
  }

  get passwordsMismatch(): boolean {
    return !!this.resetForm.errors?.['passwordsMismatch'] && this.confirmPasswordCtrl.touched;
  }
}
