import { Routes } from '@angular/router';
import { authGuard } from '../../core/auth/auth.guard';

export default [
  {
    path: '',
    loadComponent: () => import('./feature/dashboard-page/dashboard-page').then(m => m.DashboardPage),
    canActivate: [authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./feature/home-page/home-page').then(m => m.HomePage) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
] as Routes;
