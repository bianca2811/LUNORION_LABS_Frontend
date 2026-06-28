import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-form.html',
  styleUrls: ['./register-form.scss'],
})
export class RegisterForm {
  loading = input(false);
  error = input<string | null>(null);

  register = output<{ email: string; password: string; name: string }>();

  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');

  onSubmit() {
    if (!this.name() || !this.email() || !this.password()) return;
    if (this.password() !== this.confirmPassword()) return;
    this.register.emit({ email: this.email(), password: this.password(), name: this.name() });
  }
}
