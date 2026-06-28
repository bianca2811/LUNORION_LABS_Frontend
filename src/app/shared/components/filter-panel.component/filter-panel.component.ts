import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent implements OnInit {
  @Output() onApply = new EventEmitter<{ startDate: string; endDate: string }>();
  @Output() onCancel = new EventEmitter<void>();

  startDate: string = '';
  endDate: string = '';
  activeRange: string = 'Last 7 Days';

  ranges: string[] = [
    'Today', 'Yesterday', 'Last 7 Days', 
    'Last 30 Days', 'This Month', 'Last Month', 'Custom Range'
  ];

  // Variables dinámicas para los nombres de los meses y años correspondientes
  currentMonthLabel: string = '';
  nextMonthLabel: string = '';
  currentYear: number = new Date().getFullYear();
  nextYear: number = new Date().getFullYear();

  // Matrices que almacenarán los días calculados dinámicamente
  currentMonthDays: (number | null)[] = [];
  nextMonthDays: (number | null)[] = [];

  ngOnInit(): void {
    const now = new Date();
    this.generateCalendars(now.getFullYear(), now.getMonth());
    this.setDefaultDates();
  }

  // Configura los strings de fechas iniciales por defecto (los últimos 7 días)
  setDefaultDates(): void {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);

    this.startDate = this.formatDate(start);
    this.endDate = this.formatDate(end);
  }

  // Lógica matemática para construir la cuadrícula real del calendario
  generateCalendars(year: number, month: number): void {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // 1. Configurar etiquetas del mes actual
    this.currentMonthLabel = monthNames[month];
    this.currentYear = year;
    this.currentMonthDays = this.getDaysForMonth(year, month);

    // 2. Configurar etiquetas del mes siguiente
    let nextM = month + 1;
    let nextY = year;
    if (nextM > 11) {
      nextM = 0;
      nextY++;
    }
    this.nextMonthLabel = monthNames[nextM];
    this.nextYear = nextY;
    this.nextMonthDays = this.getDaysForMonth(nextY, nextM);
  }

  // Devuelve un arreglo con los días del mes, incluyendo nulos para los desfases del día de la semana
  getDaysForMonth(year: number, month: number): (number | null)[] {
    const days: (number | null)[] = [];
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Domingo, 1 = Lunes, etc.
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Rellenar espacios vacíos antes del primer día del mes
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    // Rellenar los días reales del mes
    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }

    return days;
  }

  selectRange(range: string): void {
    this.activeRange = range;
    const end = new Date();
    const start = new Date();

    switch (range) {
      case 'Today':
        break;
      case 'Yesterday':
        start.setDate(end.getDate() - 1);
        end.setDate(end.getDate() - 1);
        break;
      case 'Last 7 Days':
        start.setDate(end.getDate() - 7);
        break;
      case 'Last 30 Days':
        start.setDate(end.getDate() - 30);
        break;
      case 'This Month':
        start.setDate(1);
        break;
      case 'Last Month':
        start.setMonth(start.getMonth() - 1);
        start.setDate(1);
        end.setDate(0); // Último día del mes anterior
        break;
    }

    this.startDate = this.formatDate(start);
    this.endDate = this.formatDate(end);
  }

  // Helpers para dar formato estándar DD/MM/YYYY
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
  }

  applyFilter(): void {
    this.onApply.emit({ startDate: this.startDate, endDate: this.endDate });
  }

  cancelFilter(): void {
    this.onCancel.emit();
  }
}