import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../../store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, MatIconModule, MatButtonModule, MatListModule, AsyncPipe],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {

  private readonly store = inject(Store);

  readonly isLoggedIn$ = this.store.select(selectIsLoggedIn);

}
