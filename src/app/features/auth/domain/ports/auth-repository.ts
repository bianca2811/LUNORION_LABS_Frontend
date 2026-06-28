import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { AuthResponse } from '../models/auth-response';

export abstract class AuthRepository {
  abstract login(credentials: LoginRequest): Observable<AuthResponse>;
  abstract register(data: { email: string; password: string; name: string }): Observable<AuthResponse>;
  abstract logout(): Observable<void>;
  abstract refreshToken(token: string): Observable<AuthResponse>;
}
