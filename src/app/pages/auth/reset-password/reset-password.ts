import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Store } from '@ngrx/store';
import { ApiActions } from '../../../store';
import { passwordsMatchValidator } from '../../../shared/validators/passwords-match-validator';

// ✅ Adjust this import path to wherever your selectors live
import {
  selectApiForgotPasswordLoading,
  selectApiForgotPasswordError,
  selectApiForgotPasswordData,
  selectApiResetPasswordLoading,
  selectApiResetPasswordError,
  selectApiResetPasswordData,
} from '../../../store/api/api.selectors';

type Mode = 'request' | 'reset';

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
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  private readonly snackBar = inject(MatSnackBar);

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
    { validators: passwordsMatchValidator('password', 'confirmPassword') }
  );

  // ----------------------------
  // Store-backed signals
  // ----------------------------
  readonly forgotLoading = this.store.selectSignal(selectApiForgotPasswordLoading);
  readonly forgotError = this.store.selectSignal(selectApiForgotPasswordError);
  readonly forgotData = this.store.selectSignal(selectApiForgotPasswordData);

  readonly resetLoading = this.store.selectSignal(selectApiResetPasswordLoading);
  readonly resetError = this.store.selectSignal(selectApiResetPasswordError);
  readonly resetData = this.store.selectSignal(selectApiResetPasswordData);

  // ✅ Use this for the progress bar
  readonly loading = computed(() =>
    this.mode() === 'request' ? this.forgotLoading() : this.resetLoading()
  );

  // Track loading transitions so snackbars only fire once per request
  private readonly _prevForgotLoading = signal(false);
  private readonly _prevResetLoading = signal(false);

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

    // ----------------------------
    // FORGOT PASSWORD feedback
    // ----------------------------
    effect(() => {
      const prev = this._prevForgotLoading();
      const nowLoading = this.forgotLoading();

      // update prev each run
      this._prevForgotLoading.set(nowLoading);

      // Only react when a request just finished (true -> false)
      if (!prev || nowLoading) return;

      const err = this.forgotError();
      const data = this.forgotData();

      if (err) {
        this.snackBar.open(
          this.formatError(err) ?? 'Could not send reset email. Please try again.',
          'Dismiss',
          { duration: 5000 }
        );
        return;
      }

      if (data) {
        // Best practice: don’t reveal whether the account exists
        this.snackBar.open(
          'If an account exists for that email, a reset link has been generated.',
          'OK',
          { duration: 5000 }
        );

        // Optional: clear form
        // this.requestForm.reset();
      }
    });

    // ----------------------------
    // RESET PASSWORD feedback
    // ----------------------------
    effect(() => {
      const prev = this._prevResetLoading();
      const nowLoading = this.resetLoading();

      this._prevResetLoading.set(nowLoading);

      if (!prev || nowLoading) return;

      const err = this.resetError();
      const data = this.resetData();

      if (err) {
        this.snackBar.open(
          this.formatError(err) ?? 'Password reset failed. Please verify your token and try again.',
          'Dismiss',
          { duration: 5000 }
        );
        return;
      }

      if (data) {
        this.snackBar.open(
          'Password updated successfully. You can now log in.',
          'OK',
          { duration: 5000 }
        );

        // Optional: redirect to login
        // inject(Router).navigateByUrl('/login');
      }
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
    this.store.dispatch(ApiActions.forgotPassword({ payload: { email } }));
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

    this.store.dispatch(ApiActions.resetPassword({ payload }));
  }

  // ----------------------------
  // Helpers + getters
  // ----------------------------
  private formatError(err: unknown): string | null {
    if (!err) return null;
    if (typeof err === 'string') return err;

    // common patterns (adjust to match your app’s error shape)
    const anyErr = err as any;
    return (
      anyErr?.message ??
      anyErr?.error?.message ??
      anyErr?.error ??
      null
    );
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
