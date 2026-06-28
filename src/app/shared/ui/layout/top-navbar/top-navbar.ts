import { Component, input, signal} from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  templateUrl: './top-navbar.html',
  styleUrls: ['./top-navbar.scss']
})

export class TopNavbar {
  backgroundColor = input('#1e293b');
  userName = input('Pancito con palta');
  userRole = input('ADMINISTRADOR');
  notifications = input(0);
  dropdownOpen = signal(false);

  toggleDropdown() {
    this.dropdownOpen.update(v => !v);
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }
}