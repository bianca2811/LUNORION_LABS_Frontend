import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { LoginRequest } from '../../domain/models/login-request';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly user = computed(() => this.authService.user());
  readonly token = computed(() => this.authService.token());
  readonly isAuthenticated = computed(() => this.authService.isAuthenticated());
  readonly permissions = computed(() => this.authService.permissions());

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login(credentials: LoginRequest): void {
    this.loading.set(true);
    this.error.set(null);

    this.authService.login(credentials).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Error al iniciar sesión');
      },
    });
  }

  register(data: { email: string; password: string; name: string }): void {
    this.loading.set(true);
    this.error.set(null);

    this.authService.register(data).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Error al registrarse');
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  clearError(): void {
    this.error.set(null);
  }
}
