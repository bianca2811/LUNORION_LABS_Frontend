import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() title: string = 'No results found';
  @Input() description: string = 'Try adjusting your search or filter to find what you\'re looking for.';
  
  @Output() onHelpClick = new EventEmitter<string>();

  handleLinkClick(type: 'video' | 'help-center'): void {
    this.onHelpClick.emit(type);
  }
}