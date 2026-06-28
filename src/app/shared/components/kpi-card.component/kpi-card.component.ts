import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() mainValue: string = '';
  @Input() compareLabel: string = 'MTD LY';
  @Input() compareValue: string = '';
  @Input() gapValue: string = '';
  @Input() gapPercentage: string = '';
  @Input() isPositiveGap: boolean = true;
  @Input() trendLabel: string = 'LAST 30 DAYS';
  @Input() trendData: number[] = [];

  svgPath: string = '';

  ngOnInit(): void {
    this.generateSparkline();
  }

  generateSparkline(): void {
    if (!this.trendData || this.trendData.length === 0) return;

    const width = 120;
    const height = 30;
    const padding = 2;

    const maxX = this.trendData.length - 1;
    const minY = Math.min(...this.trendData);
    const maxY = Math.max(...this.trendData);

    const points = this.trendData.map((val, index) => {
      const x = (index / maxX) * width;
      const y = height - padding - ((val - minY) / (maxY - minY || 1)) * (height - 2 * padding);
      return `${x},${y}`;
    });

    this.svgPath = `M ${points.join(' L ')}`;
  }
}