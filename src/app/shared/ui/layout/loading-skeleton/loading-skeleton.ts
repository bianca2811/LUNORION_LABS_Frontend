import { Component, input } from '@angular/core';
export type SkeletonType =
  | 'card'
  | 'table'
  | 'form';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  templateUrl: './loading-skeleton.html',
  styleUrl: './loading-skeleton.scss'
})

export class LoadingSkeleton {
  type = input<SkeletonType>('card');
}
