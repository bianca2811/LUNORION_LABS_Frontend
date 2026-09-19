import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./feature/suppliers-layout/suppliers-layout').then(m => m.SuppliersLayout),
    children: [
      { path: '', loadComponent: () => import('./feature/suppliers-list/suppliers-list').then(m => m.SuppliersList) },
      { path: 'new', loadComponent: () => import('./feature/suppliers-form/suppliers-form').then(m => m.SuppliersForm) },
      { path: ':id', loadComponent: () => import('./feature/suppliers-details/suppliers-details').then(m => m.SuppliersDetails) },
      { path: ':id/edit', loadComponent: () => import('./feature/suppliers-form/suppliers-form').then(m => m.SuppliersForm) },
    ]
  }
] as Routes;
