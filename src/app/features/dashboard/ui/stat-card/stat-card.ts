import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrls: ['./stat-card.scss'],
})
export class StatCard {
  label = input.required<string>();
  value = input.required<string | number>();
  icon = input('pi pi-chart-bar');
  color = input('#3b82f6');
}
