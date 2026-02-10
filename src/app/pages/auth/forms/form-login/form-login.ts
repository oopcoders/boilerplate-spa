import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [MatDialogModule, AsyncPipe, MatProgressSpinnerModule, MatInputModule,
    ReactiveFormsModule, MatButtonModule],
  templateUrl: './form-login.html',
  styleUrl: './form-login.scss',
})
export class FormLogin {

  form!: FormGroup;

  error$: Observable<string | null> = of(null);
  loading$: Observable<boolean> = of(false);
  isLoggedIn$: Observable<boolean> = of(false);

  @Output() completed = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.error$ = this.store.select(selectApiLoginError);
    this.loading$ = this.store.select(selectApiLoginLoading);

    this.isLoggedIn$ = this.store.select(selectIsLoggedIn).pipe(
      tap((isLoggedIn) => {
        if (isLoggedIn) {
          this.completed.emit()
        }
      })
    );

  }
  login() {
    if (this.form.valid) {
      this.store.dispatch(
        ApiActions.login({
          payload: this.form.value,
        })
      );
    }
  }

}
