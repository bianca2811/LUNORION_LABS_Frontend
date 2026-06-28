import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterForm } from '../../ui/register-form/register-form';
import { AuthStore } from '../../data-access/state/auth.store';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterModule, RegisterForm],
  templateUrl: './register-page.html',
  styleUrls: ['./register-page.scss'],
})
export class RegisterPage {
  readonly store = inject(AuthStore);

  onRegister(data: { email: string; password: string; name: string }): void {
    this.store.register(data);
  }
}
