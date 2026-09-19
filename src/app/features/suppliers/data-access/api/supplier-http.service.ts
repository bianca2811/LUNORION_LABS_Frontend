import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SupplierRepository } from '../../domain/ports/supplier-repository';
import { Supplier } from '../../domain/models/supplier';

@Injectable()
export class SupplierHttpService implements SupplierRepository {
  private readonly apiUrl = `${environment.apiUrl}/proveedores`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
  }

  getById(id: string): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  getByTenant(tenantId: string): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}/tenant/${tenantId}`);
  }

  create(supplier: Omit<Supplier, 'id' | 'activo'>): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, supplier);
  }

  deactivate(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/desactivar`, {});
  }
}
