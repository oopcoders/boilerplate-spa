import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DialogLogin } from '../../../pages/auth/dialogs/dialog-login/dialog-login';
import { DialogRegister } from '../../../pages/auth/dialogs/dialog-register/dialog-register';
import { Store } from '@ngrx/store';
import { ApiActions } from '../../../store/api/api.actions';
import { Observable, of } from 'rxjs';
import { selectIsLoggedIn } from '../../../store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule, MatMenuModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {

  readonly loginDialog = inject(MatDialog);
  readonly registerDialog = inject(MatDialog);
  private store = inject(Store);
  isLoggedIn$: Observable<boolean> = of(false);

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn)
  }

  openRegisterDialog(): void {
    this.registerDialog.open(DialogRegister, {
      height: '450px',
      width: '400px',
    });
  }

  openLoginDialog(): void {
    this.loginDialog.open(DialogLogin, {
      height: '400px',
      width: '400px',
    });
  }

  logout(): void {
    this.store.dispatch(ApiActions.logout())

  }

}
