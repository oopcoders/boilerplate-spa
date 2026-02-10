import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { FormLogin } from '../../forms/form-login/form-login';


@Component({
  selector: 'app-dialog-login',
  imports: [MatDialogModule, FormLogin],
  templateUrl: './dialog-login.html',
  styleUrl: './dialog-login.scss',
})
export class DialogLogin {

  constructor(
    private dialogRef: MatDialogRef<DialogLogin>,
  ) { }


  close() {
    this.dialogRef.close();
  }
}
