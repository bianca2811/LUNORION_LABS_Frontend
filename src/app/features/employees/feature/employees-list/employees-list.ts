/* // Original
import { Component } from '@angular/core';

 @Component({
   selector: 'app-employees-list',
   standalone: true,
   templateUrl: './employees-list.html',
   styleUrls: ['./employees-list.scss']
 })
 export class EmployeesList{} */


/* // V1
 import { Component, OnInit, inject } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { EmployeesService } from '../../employees.service';

 @Component({
   selector: 'app-employees-list',
   standalone: true,
   // 🌟 CommonModule le permite a la plantilla entender tanto *ngFor como [ngClass] sin restricciones
   imports: [CommonModule],
   templateUrl: './employees-list.html',
   styleUrls: ['./employees-list.scss']
 })
 export class EmployeesList implements OnInit {
  
   private employeesService = inject(EmployeesService);

   // Declaración limpia del listado de asistencia
   asistenciaList: any[] = [];
   boletasList: any[] = [];
   comisionesList: any[] = [];
  
   progresoBoletas: number = 85;

   ngOnInit(): void {
     this.cargarDatosDashboard();
   }

   cargarDatosDashboard(): void {
     this.employeesService.getAsistencia().subscribe({
       next: (data: any) => {
         this.asistenciaList = data;
       },
       error: (err: any) => {
         console.error('Error al cargar la asistencia:', err);
       }
     });

     this.employeesService.getBoletas().subscribe({
       next: (data: any) => {
         this.boletasList = data;
       },
       error: (err: any) => {
         console.error('Error al cargar las boletas:', err);
       }
     });

     this.employeesService.getComisiones().subscribe({
       next: (data: any) => {
         this.comisionesList = data;
       },
       error: (err: any) => {
         console.error('Error al cargar las comisiones:', err);
       }
     });
   }
 }*/


// V2
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  name: string;
  initials: string;
  avatarBg: string;
  document: string;
  email: string;
  phone: string;
  status: string;
  statusClass: string;
}

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees-list.html',
  styleUrls: ['./employees-list.scss']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  // Modelos de filtros vinculados
  searchQuery: string = '';
  selectedStatus: string = '';

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees = [
      {
        name: 'Alejandro Martínez',
        initials: 'AM',
        avatarBg: '#EFF6FF',
        document: 'ID-98234-X',
        email: 'a.martinez@email.com',
        phone: '+34 612 345 678',
        status: 'activo',
        statusClass: 'status-active'
      },
      {
        name: 'Beatriz Castro',
        initials: 'BC',
        avatarBg: '#F5F3FF',
        document: 'ID-44120-L',
        email: 'b.castro@proyectos.io',
        phone: '+34 655 896 122',
        status: 'activo',
        statusClass: 'status-active'
      },
      {
        name: 'Carlos Villalobos',
        initials: 'CV',
        avatarBg: '#FFF7ED',
        document: 'ID-00912-M',
        email: 'carlos.v@tecnomundo.es',
        phone: '+34 600 111 222',
        status: 'en espera',
        statusClass: 'status-pending'
      },
      {
        name: 'Diana Rivas',
        initials: 'DR',
        avatarBg: '#FEE2E2',
        document: 'ID-33988-P',
        email: 'drivas_design@gmail.com',
        phone: '+34 644 333 981',
        status: 'inactivo',
        statusClass: 'status-inactive'
      },
      {
        name: 'Elena Sorolla',
        initials: 'ES',
        avatarBg: '#E8F5E9',
        document: 'ID-12776-K',
        email: 'esorolla.lab@net.es',
        phone: '+34 677 888 123',
        status: 'activo',
        statusClass: 'status-active'
      }
    ];

    this.filteredEmployees = [...this.employees];
  }

  applyFilters(): void {
    this.filteredEmployees = this.employees.filter(employee => {
      const matchesSearch = !this.searchQuery ? true : 
        employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        employee.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employee.document.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesStatus = !this.selectedStatus ? true : 
        employee.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedStatus = '';
    this.filteredEmployees = [...this.employees];
  }
}
