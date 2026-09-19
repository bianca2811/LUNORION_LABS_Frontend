import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier';

export abstract class SupplierRepository {
  abstract getAll(): Observable<Supplier[]>;
  abstract getById(id: string): Observable<Supplier>;
  abstract getByTenant(tenantId: string): Observable<Supplier[]>;
  abstract create(supplier: Omit<Supplier, 'id' | 'activo'>): Observable<Supplier>;
  abstract deactivate(id: string): Observable<void>;
}
