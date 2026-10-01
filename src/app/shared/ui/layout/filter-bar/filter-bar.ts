// V1

// *** V3 *** // Componente Standalone Reutilizable - Rutas de Plantillas Corregidas
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterOptions {
  text: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.html', // 👈 Corregido: Sin ".component"
  styleUrls: ['./filter-bar.scss']   // 👈 Corregido: Sin ".component"
})
export class FilterBarComponent {
  
  // Opciones de estados personalizables según la clase que lo llame
  @Input() statusOptions: string[] = ['Activo', 'En Espera', 'Inactivo'];
  
  // Placeholder dinámico para el campo de búsqueda de texto
  @Input() textPlaceholder: string = 'Texto';

  // Emisores de eventos hacia los componentes padres
  @Output() onFilter = new EventEmitter<FilterOptions>();
  @Output() onClear = new EventEmitter<void>();

  // Modelo local para los filtros de la barra
  filterValues: FilterOptions = {
    text: '',
    status: '',
    date: ''
  };

  /**
   * Comunica los filtros actuales al componente contenedor
   */
  applyFilters(): void {
    this.onFilter.emit({ ...this.filterValues });
  }

  /**
   * Deshace los filtros restableciendo los campos y notificando al padre
   */
  clearFilters(): void {
    this.filterValues = {
      text: '',
      status: '',
      date: ''
    };
    this.onClear.emit();
  }

  /**
   * Retorna verdadero si el usuario ha interactuado con algún filtro
   */
  hasActiveFilters(): boolean {
    return !!(this.filterValues.text || this.filterValues.status || this.filterValues.date);
  }
}