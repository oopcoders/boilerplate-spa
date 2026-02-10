import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';

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
