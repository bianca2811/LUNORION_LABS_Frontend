import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginForm } from '../../ui/login-form/login-form';
import { AuthStore } from '../../data-access/state/auth.store';
import { LoginRequest } from '../../domain/models/login-request';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, LoginForm],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage {
  readonly store = inject(AuthStore);

  onLogin(credentials: LoginRequest): void {
    this.store.login(credentials);
  }
}
