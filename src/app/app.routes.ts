import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { UsersList } from './pages/users/users-list/users-list';
import { UsersSingle } from './pages/users/users-single/users-single';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.routes').then(p => p.routes)
  },
  {
    path: '**',
    component: NotFound,
  },
];
