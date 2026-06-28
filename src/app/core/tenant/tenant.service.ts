import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TenantService {
  readonly tenantId = signal<string | null>(null);

  setTenant(id: string): void {
    this.tenantId.set(id);
  }

  clear(): void {
    this.tenantId.set(null);
  }
}
