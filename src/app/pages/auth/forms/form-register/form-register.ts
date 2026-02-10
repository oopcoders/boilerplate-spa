import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ApiActions, ApiAuthResponse, selectApiRegisterError, selectApiRegisterLoading, selectApiRegisterUser } from '../../../../store';
import { Store } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-form-register',
  imports: [MatDialogModule, AsyncPipe, ReactiveFormsModule, MatInputModule,
    MatFormFieldModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './form-register.html',
  styleUrl: './form-register.scss',
})
export class FormRegister {
  form!: FormGroup;

  error$: Observable<string | null> = of(null);
  loading$: Observable<boolean> = of(false);
  user$: Observable<ApiAuthResponse | null> = of(null);

  @Output() completed = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.error$ = this.store.select(selectApiRegisterError);
    this.loading$ = this.store.select(selectApiRegisterLoading);
    this.user$ = this.store.select(selectApiRegisterUser);

  }

  register() {
    if (this.form.valid) {
      this.store.dispatch(
        ApiActions.register({
          payload: this.form.value,
        })
      );
    }
  }
}
