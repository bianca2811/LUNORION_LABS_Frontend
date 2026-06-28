import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DashboardRepository } from '../../domain/ports/dashboard-repository';
import { DashboardStats } from '../../domain/models/dashboard-stats';

@Injectable()
export class DashboardHttpService implements DashboardRepository {
  private readonly apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
  }
}
