import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() buttonText: string = '';
  @Input() searchPlaceholder: string = 'Buscar...';

  @Output() onSearch = new EventEmitter<string>();
  @Output() onActionClick = new EventEmitter<void>();

  searchTerm: string = '';

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.onSearch.emit(value);
  }

  handleAction(): void {
    this.onActionClick.emit();
  }
}