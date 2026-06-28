import { Observable } from 'rxjs';
import { DashboardStats } from '../models/dashboard-stats';

export abstract class DashboardRepository {
  abstract getStats(): Observable<DashboardStats>;
}
