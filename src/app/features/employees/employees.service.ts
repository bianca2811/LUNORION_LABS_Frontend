// V1
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api'; 

  getAsistencia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asistencia`);
  }

  getBoletas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/boletas`);
  }

  getComisiones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comisiones`);
  }
}
