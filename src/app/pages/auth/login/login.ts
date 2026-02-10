import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { FormLogin } from '../forms/form-login/form-login';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,

    // Material
    MatCardModule,
    MatButtonModule,
    MatDividerModule,

    // Shared auth form
    FormLogin
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private router: Router) { }

  onLoginSuccess(): void {
    this.router.navigateByUrl('/');
  }
}
