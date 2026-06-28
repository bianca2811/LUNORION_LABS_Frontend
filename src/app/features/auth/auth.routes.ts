import { Routes } from '@angular/router';

export default [
  { path: 'login', loadComponent: () => import('./feature/login-page/login-page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./feature/register-page/register-page').then(m => m.RegisterPage) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
] as Routes;
