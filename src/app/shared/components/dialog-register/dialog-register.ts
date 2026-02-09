import {AsyncPipe} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {ApiActions, ApiAuthResponse, selectApiRegisterError, selectApiRegisterLoading, selectApiRegisterUser} from '../../../store';

@Component({
  selector: 'app-dialog-register',
  imports: [ReactiveFormsModule, MatDialogModule, MatInputModule,
     MatFormFieldModule, MatButtonModule, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './dialog-register.html',
  styleUrl: './dialog-register.scss',
})
export class DialogRegister implements OnInit {

  form!: FormGroup;

  error$: Observable<string | null> = of(null);
  loading$: Observable<boolean> = of(false);
  user$: Observable<ApiAuthResponse | null> = of(null);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogRegister>,
    private store: Store
  ) {}

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

  closeDialog() {
    this.dialogRef.close();
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
