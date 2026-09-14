// // Original
// import { Routes } from '@angular/router';

//  export default [
//    { path: '', loadComponent: () => import('./feature/employees-list/employees-list').then(m => m.EmployeesList) },
//    { path: 'new', loadComponent: () => import('./feature/employees-form/employees-form').then(m => m.EmployeesForm) },
//    { path: ':id', loadComponent: () => import('./feature/employees-details/employees-details').then(m => m.EmployeesDetails) },
//    { path: ':id/edit', loadComponent: () => import('./feature/employees-form/employees-form').then(m => m.EmployeesForm) },
//  ] as Routes;


// V1
import { Routes } from '@angular/router';
import { EmployeesList } from './feature/employees-list/employees-list';
import { EmployeesForm } from './feature/employees-form/employees-form';
import { EmployeesDetails } from './feature/employees-details/employees-details';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    component: EmployeesList
  },
  {
    path: 'new',
    component: EmployeesForm
  },
  {
    path: ':id',
    component: EmployeesDetails
  },
  {
    path: ':id/edit',
    component: EmployeesForm
  }
];

export default EMPLOYEES_ROUTES;
