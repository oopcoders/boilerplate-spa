import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {Store} from '@ngrx/store';
import {ApiActions} from '../../../store/api/api.actions';
import {Observable, of, tap} from 'rxjs';
import {selectApiLoginError, selectApiLoginLoading, selectIsLoggedIn} from '../../../store';
import {AsyncPipe} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-login',
  imports: [ReactiveFormsModule, MatDialogModule, MatInputModule,
     MatFormFieldModule, MatButtonModule, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './dialog-login.html',
  styleUrl: './dialog-login.scss',
})
export class DialogLogin implements OnInit {
  form!: FormGroup;

  error$: Observable<string | null> = of(null);
  loading$: Observable<boolean> = of(false);
  isLoggedIn$: Observable<boolean> = of(false);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogLogin>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; bio: string },
    private store: Store
  ) {}

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
          this.closeDialog();
        }
      })
    );

  }

  closeDialog() {
    this.dialogRef.close();
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
