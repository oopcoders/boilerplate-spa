import { Routes } from '@angular/router';
import { Pages } from './pages';

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
                path: 'auth',
                loadChildren: () => import('./auth/auth.routes').then(p => p.routes)
            },
        ]
    }
];