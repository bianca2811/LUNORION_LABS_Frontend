// // Original
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employees-list',
//   standalone: true,
//   templateUrl: './employees-list.html',
//   styleUrls: ['./employees-list.scss']
// })
// export class EmployeesList{}


// V1
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
}
