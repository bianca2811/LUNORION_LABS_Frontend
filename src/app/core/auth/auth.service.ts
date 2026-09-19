import { Injectable, signal, computed, inject, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  nombres: string;
  apellidos: string;
  rol: string;
  permisos: string[];
}

export interface TenantInfo {
  id: string;
  ruc: string;
  razonSocial: string;
  nombreComercial: string;
  logoUrl: string;
  colorPrimario: string;
  colorSecundario: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  tenantId?: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  usuario: User;
  tenant: TenantInfo;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  readonly token = signal<string | null>(this.loadToken());
  readonly user = signal<User | null>(null);
  readonly isAuthenticated = computed(() => !!this.token());
  readonly permissions = computed(() => this.user()?.permisos ?? []);

  constructor() {
    if (this.token()) {
      this.loadUserProfile().pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe();
    }
  }

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => this.handleAuthResponse(res)),
    );
  }

  register(data: { email: string; password: string; name: string }) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((res) => this.handleAuthResponse(res)),
    );
  }

  logout() {
    this.token.set(null);
    this.user.set(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('tenant_id');
  }

  refreshToken() {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {}).pipe(
      tap((res) => this.handleAuthResponse(res)),
    );
  }

  private loadUserProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`).pipe(
      tap((user) => this.user.set(user)),
    );
  }

  private handleAuthResponse(res: AuthResponse) {
    this.token.set(res.token);
    this.user.set(res.usuario);
    localStorage.setItem('auth_token', res.token);
    localStorage.setItem('tenant_id', res.tenant.id);
  }

  private loadToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
