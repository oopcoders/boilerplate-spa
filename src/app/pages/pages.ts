import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
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

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    AsyncPipe,
    Settings,
    Navigation,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
})
export class Pages implements OnInit {
  @ViewChild('mainnav') mainnav!: MatSidenav;
  readonly loginDialog = inject(MatDialog);
  readonly registerDialog = inject(MatDialog);
  private store = inject(Store);

  private breakpointObserver = inject(BreakpointObserver);

  isLoggedIn$: Observable<boolean> = of(false);

  // ✅ handset breakpoint observable
  readonly isHandset$ = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map(r => r.matches),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
  }

  openRegisterDialog(): void {
    this.registerDialog.open(DialogRegister, {
      height: '650px',
      width: '500px',
    });
  }

  openLoginDialog(): void {
    this.loginDialog.open(DialogLogin, {
      height: '450px',
      width: '400px',
    });
  }

  closeMainNavOnMobile(): void {
    // Only close when it's acting like a drawer (mobile)
    if (this.mainnav?.mode === 'over') {
      this.mainnav.close();
    }
  }
}