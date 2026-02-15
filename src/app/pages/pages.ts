import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectIsLoggedIn } from '../store';
import { DialogLogin } from './auth/dialogs/dialog-login/dialog-login';
import { DialogRegister } from './auth/dialogs/dialog-register/dialog-register';
import { AsyncPipe } from '@angular/common';
import { Settings } from '../shared/components/settings/settings';
import { Navigation } from '../shared/components/navigation/navigation';

@Component({
  selector: 'app-pages',
  imports: [RouterOutlet, MatSidenavModule, AsyncPipe, Settings, Navigation,
    MatToolbarModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
})
export class Pages implements OnInit {
  readonly loginDialog = inject(MatDialog);
  readonly registerDialog = inject(MatDialog);
  private store = inject(Store);

  isLoggedIn$: Observable<boolean> = of(false);

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn)
  }

  openRegisterDialog(): void {
    this.registerDialog.open(DialogRegister, {
      height: '550px',
      width: '500px',
    });
  }

  openLoginDialog(): void {
    this.loginDialog.open(DialogLogin, {
      height: '400px',
      width: '400px',
    });
  }

}
