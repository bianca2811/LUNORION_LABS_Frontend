import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TenantService {
  readonly tenantId = signal<string | null>(this.loadTenantId());

  setTenant(id: string): void {
    this.tenantId.set(id);
    localStorage.setItem('tenant_id', id);
  }

  clear(): void {
    this.tenantId.set(null);
    localStorage.removeItem('tenant_id');
  }

  getTenantId(): string | null {
    // Si ya tenemos el tenantId en el signal, retornarlo
    const current = this.tenantId();
    if (current) return current;

    // Intentar obtenerlo del localStorage
    const fromStorage = localStorage.getItem('tenant_id');
    if (fromStorage) {
      this.tenantId.set(fromStorage);
      return fromStorage;
    }

    return null;
  }

  private loadTenantId(): string | null {
    return localStorage.getItem('tenant_id');
  }
}
