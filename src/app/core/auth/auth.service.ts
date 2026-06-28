import { Injectable, signal, computed, inject, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
  tenantId?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  readonly token = signal<string | null>(this.loadToken());
  readonly user = signal<User | null>(null);
  readonly refreshTokenValue = signal<string | null>(null);

  readonly isAuthenticated = computed(() => !!this.token());
  readonly permissions = computed(() => this.user()?.permissions ?? []);

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
    this.refreshTokenValue.set(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  refreshToken() {
    const rt = this.refreshTokenValue();
    if (!rt) throw new Error('No refresh token available');

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken: rt }).pipe(
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
    this.user.set(res.user);
    this.refreshTokenValue.set(res.refreshToken);
    localStorage.setItem('auth_token', res.token);
    localStorage.setItem('refresh_token', res.refreshToken);
  }

  private loadToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
