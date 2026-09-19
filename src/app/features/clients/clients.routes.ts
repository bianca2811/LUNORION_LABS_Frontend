import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () =>
      import('./feature/clients-list/clients-list')
        .then(m => m.ClientsList)
  },

  {
    path: 'new',
    loadComponent: () =>
      import('./feature/clients-form/clients-form')
        .then(m => m.ClientsForm)
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import('./feature/clients-form/clients-form')
        .then(m => m.ClientsForm)
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./feature/clients-details/clients-details')
        .then(m => m.ClientsDetails)
  }

] as Routes;