import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../domain/models/login-request';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.scss'],
})
export class LoginForm {
  loading = input(false);
  error = input<string | null>(null);

  login = output<LoginRequest>();

  email = signal('');
  password = signal('');

  onSubmit() {
    if (!this.email() || !this.password()) return;
    this.login.emit({ email: this.email(), password: this.password() });
  }
}
