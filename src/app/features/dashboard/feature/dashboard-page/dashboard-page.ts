import { Component, signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../../../shared/ui/layout/sidebar/sidebar';
import { TopNavbar } from '../../../../shared/ui/layout/top-navbar/top-navbar';
import { Breadcrumb } from '../../../../shared/ui/layout/breadcrumb/breadcrumb';
import { SidebarItem } from '../../../../shared/ui/layout/sidebar/sidebar-item.interface';
import { AuthStore } from '../../../auth/data-access/state/auth.store';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterModule, Sidebar, TopNavbar, Breadcrumb],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.scss'],
})
export class DashboardPage {
  private readonly authStore = inject(AuthStore);

  readonly menuItems = signal<SidebarItem[]>([
    { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard/home' },
    { label: 'Inventario', icon: 'pi pi-box', route: '/inventory', permission: 'inventory:read' },
    { label: 'Facturación', icon: 'pi pi-file-invoice', route: '/billing', permission: 'billing:read' },
    { label: 'Usuarios', icon: 'pi pi-users', route: '/users', permission: 'users:read' },
  ]);

  readonly userName = computed(() => this.authStore.user()?.name ?? 'Usuario');
  readonly userRole = computed(() => this.authStore.user()?.role ?? '');
  readonly permissions = computed(() => this.authStore.permissions());

  onLogout(): void {
    this.authStore.logout();
  }
}