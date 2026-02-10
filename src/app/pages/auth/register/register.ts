import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { FormRegister } from '../forms/form-register/form-register';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,

    // Material
    MatCardModule,
    MatButtonModule,
    MatDividerModule,

    // Shared auth form
    FormRegister
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  constructor(private router: Router) { }

  onRegisterSuccess(): void {
    this.router.navigateByUrl('/');
  }

}
