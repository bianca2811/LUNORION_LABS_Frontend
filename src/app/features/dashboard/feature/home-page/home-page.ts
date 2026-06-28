import { Component } from '@angular/core';
import { StatCard } from '../../ui/stat-card/stat-card';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [StatCard],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage {}
