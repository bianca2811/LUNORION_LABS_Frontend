import { Injectable, signal } from '@angular/core';
import { DashboardStats } from '../../domain/models/dashboard-stats';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  readonly stats = signal<DashboardStats | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  setStats(stats: DashboardStats): void {
    this.stats.set(stats);
  }

  setLoading(value: boolean): void {
    this.loading.set(value);
  }

  setError(error: string | null): void {
    this.error.set(error);
  }
}
