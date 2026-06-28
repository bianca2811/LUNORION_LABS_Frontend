import { Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

export interface AppError {
  message: string;
  code?: string;
  status?: number;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class ErrorService {
  readonly lastError = signal<AppError | null>(null);

  handleError(error: unknown): void {
    const appError = this.normalizeError(error);
    this.lastError.set(appError);
    console.error('[App Error]', appError);
  }

  clearError(): void {
    this.lastError.set(null);
  }

  private normalizeError(error: unknown): AppError {
    if (error instanceof HttpErrorResponse) {
      return {
        message: error.error?.message || error.message || 'Error del servidor',
        code: error.error?.code,
        status: error.status,
        timestamp: new Date(),
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        timestamp: new Date(),
      };
    }

    return {
      message: 'Error desconocido',
      timestamp: new Date(),
    };
  }
}
