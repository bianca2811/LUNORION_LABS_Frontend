import { Component, input, output } from '@angular/core';
export type DialogType = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss'
})

export class ConfirmationDialog {

  visible = input(true);
  title = input('Confirmación');
  message = input('¿Desea continuar?');
  type = input<DialogType>('warning');
  confirm = output<void>();
  cancel = output<void>();

  get iconClass(): string {
    switch (this.type()) {
      case 'info':
        return 'pi pi-info-circle';

      case 'success':
        return 'pi pi-check-circle';

      case 'warning':
        return 'pi pi-exclamation-triangle';

      case 'danger':
        return 'pi pi-times-circle';

      default:
        return 'pi pi-exclamation-triangle';
    }
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}