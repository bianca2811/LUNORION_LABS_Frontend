/* // Original
import { Component } from '@angular/core';

@Component({
  selector: 'app-employees-details',
  standalone: true,
  templateUrl: './employees-details.html',
  styleUrls: ['./employees-details.scss']
})
export class EmployeesDetails {} */


// V1
// *** V3 *** // Controlador de Detalles: Sincronizado al 100% con la semántica de desactivación lógica
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-employees-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-details.html',
  styleUrls: ['./employees-details.scss']
})
export class EmployeesDetails implements OnInit {

  employee: Employee | null = null;
  isModalOpen: boolean = false;

  private mockDatabase: Employee[] = [
    { name: 'Alejandro Martínez', initials: 'AM', avatarBg: '#EFF6FF', document: 'ID-98234-X', email: 'a.martinez@email.com', phone: '+34 612 345 678', status: 'activo', statusClass: 'status-active' },
    { name: 'Beatriz Castro', initials: 'BC', avatarBg: '#F5F3FF', document: 'ID-44120-L', email: 'b.castro@proyectos.io', phone: '+34 655 896 122', status: 'activo', statusClass: 'status-active' },
    { name: 'Carlos Villalobos', initials: 'CV', avatarBg: '#FFF7ED', document: 'ID-00912-M', email: 'carlos.v@tecnomundo.es', phone: '+34 600 111 222', status: 'en espera', statusClass: 'status-pending' },
    { name: 'Diana Rivas', initials: 'DR', avatarBg: '#FEE2E2', document: 'ID-33988-P', email: 'drivas_design@gmail.com', phone: '+34 644 333 981', status: 'inactivo', statusClass: 'status-inactive' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.buscarEmpleado(employeeId);
    }

    this.route.queryParams.subscribe(params => {
      if (params['modal'] === 'open') {
        this.isModalOpen = true;
      }
    });
  }

  buscarEmpleado(id: string): void {
    const encontrado = this.mockDatabase.find(e => e.document === id);
    this.employee = encontrado ? { ...encontrado } : null;
  }

  cerrarModal(): void {
    this.isModalOpen = false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { modal: null },
      queryParamsHandling: 'merge'
    });
  }

  desactivarEmpleado(): void {
    if (this.employee) {
      // Cambio de estado lógico e inmutable
      this.employee.status = 'inactivo';
      this.employee.statusClass = 'status-inactive';
      
      // Mensaje de trazabilidad limpio y correcto
      console.log('Desactivación lógica del empleado completada con éxito:', this.employee);
      
      this.cerrarModal();
      this.regresarAlListado();
    }
  }

  regresarAlListado(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
