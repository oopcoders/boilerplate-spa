import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login').then(c => c.Login),
        data: { breadcrumb: 'Login Page' }
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register').then(c => c.Register),
        data: { breadcrumb: 'Register Page' }
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./reset-password/reset-password').then(c => c.ResetPassword),
        data: { breadcrumb: 'Reset Password Page' }
    },
];
