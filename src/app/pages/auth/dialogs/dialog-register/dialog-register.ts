import { Component } from '@angular/core';
import { FormRegister } from '../../forms/form-register/form-register';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-register',
  imports: [FormRegister, MatDialogModule],
  templateUrl: './dialog-register.html',
  styleUrl: './dialog-register.scss',
})
export class DialogRegister {

  constructor(
    private dialogRef: MatDialogRef<DialogRegister>,
  ) { }


  close() {
    this.dialogRef.close();
  }

}
