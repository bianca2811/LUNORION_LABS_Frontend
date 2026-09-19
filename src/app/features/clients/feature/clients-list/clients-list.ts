import { Component } from '@angular/core';
import { ClientsForm } from '../clients-form/clients-form';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [ClientsForm],
  templateUrl: './clients-list.html',
  styleUrl: './clients-list.scss'
})
export class ClientsList {
 showClientModal = false;

  openClientModal(): void {
    this.showClientModal = true;
  }

  closeClientModal(): void {
    this.showClientModal = false;
  }
}