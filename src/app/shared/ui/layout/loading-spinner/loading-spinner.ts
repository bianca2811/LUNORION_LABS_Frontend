import { Component, input } from '@angular/core';

export type SpinnerType = 'dots' | 'ring' | 'lines';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss'
})
export class LoadingSpinner {
  type = input<SpinnerType>('lines');
  color = input('#3b82f6');
  size = input(54);
}