import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-suppliers-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="suppliers-layout">
      <router-outlet />
    </div>
  `,
  styleUrls: ['./suppliers-layout.scss']
})
export class SuppliersLayout {}
