import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { selectIsLoggedIn } from '../../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private store = inject(Store);

  protected readonly title = signal('Boilerplate SPA');

  protected readonly features = signal([
    {
      icon: 'verified_user',
      title: 'Authentication-ready',
      desc: 'Login + Register wired up with Angular Material and NgRx.',
    },
    {
      icon: 'security',
      title: 'Route protection',
      desc: 'Guards + auth interceptor pattern in place for secured endpoints.',
    },
    {
      icon: 'build',
      title: 'Reusable structure',
      desc: 'Clean page layout, shared components, and scalable folder organization.',
    },
  ]);

  protected readonly isLoggedIn$ = this.store.select(selectIsLoggedIn);
}
