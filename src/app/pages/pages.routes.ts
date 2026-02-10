import { Routes } from '@angular/router';
import { Pages } from './pages';
import { authGuard } from '../shared/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: Pages,
        children: [
            {
                path: '',
                loadComponent: () => import('./home/home').then(c => c.Home),
                data: { breadcrumb: 'Home Page' }
            },
            {
                path: 'users',
                canActivate: [authGuard],
                runGuardsAndResolvers: 'always',
                loadComponent: () => import('./users/users-list/users-list').then(c => c.UsersList),
                data: { breadcrumb: 'List Of all Users' }
            },
            {
                path: 'users/:id',
                canActivate: [authGuard],
                runGuardsAndResolvers: 'always',
                loadComponent: () => import('./users/users-single/users-single').then(c => c.UsersSingle),
                data: { breadcrumb: 'User Profile Manager' }
            },
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.routes').then(p => p.routes)
            },
        ]
    }
];