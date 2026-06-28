import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeStatus = 'connected' | 'importing' | 'disabled' | 'attention';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {
  @Input() status: BadgeStatus = 'connected';
  @Input() customText?: string;

  get icon(): string {
    switch (this.status) {
      case 'connected': return '✅';
      case 'importing': return '⏳'; 
      case 'disabled': return '📴';  
      case 'attention': return '⚠️';
      default: return '';
    }
  }

  get label(): string {
    if (this.customText) return this.customText;
    
    switch (this.status) {
      case 'connected': return 'Connected';
      case 'importing': return 'Importing';
      case 'disabled': return 'Disabled';
      case 'attention': return 'Needs attention';
      default: return '';
    }
  }
}