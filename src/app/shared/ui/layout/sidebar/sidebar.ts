import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarItem } from './sidebar-item.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})

export class Sidebar {
  items = input<SidebarItem[]>([]);
  backgroundColor = input('#1f2937');
  primaryColor = input('#3b82f6');
  title = input('Lunorion Labs');
  logoUrl = input('');
  permissions = input<string[]>([]);
  collapsed = signal(false);
  logout = output<void>();

  get visibleItems() {
    return this.items().filter(
      item =>
        !item.permission ||
        this.permissions().includes(item.permission)
    );
  }

  toggleSidebar() {
    this.collapsed.set(!this.collapsed());
  }

  onLogout() {
    this.logout.emit();
  }
}
