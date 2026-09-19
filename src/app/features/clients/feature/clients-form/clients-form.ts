import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-clients-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './clients-form.html',
  styleUrl: './clients-form.scss'
})
export class ClientsForm {
  private fb = inject(FormBuilder);

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  isSaving = false;

  clientForm = this.fb.group({
    nombres: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.onlyLettersValidator]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100), this.onlyLettersValidator]],
    tipoDocumento: ['DNI', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    razonSocial: ['', [Validators.maxLength(150)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
    direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    consentimientoDatos: [false, Validators.requiredTrue]
  });

  constructor() {
    this.clientForm.get('tipoDocumento')?.valueChanges.subscribe(() => {
      this.updateDocumentValidation();
    });

    this.updateDocumentValidation();
  }

  private onlyLettersValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim();

    if (!value) {
      return null;
    }

    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)
      ? null
      : { onlyLetters: true };
  }

  private updateDocumentValidation(): void {
    const type = this.clientForm.get('tipoDocumento')?.value;
    const control = this.clientForm.get('numeroDocumento');

    if (!control) {
      return;
    }

    control.clearValidators();

    if (type === 'DNI') {
      control.setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/)
      ]);
    }

    if (type === 'RUC') {
      control.setValidators([
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/)
      ]);
    }

    if (type === 'CE') {
      control.setValidators([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(/^[A-Za-z0-9]+$/)
      ]);
    }

    control.updateValueAndValidity();
  }

  submitClient(): void {
    if (this.isSaving) {
      return;
    }

    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const clientData = this.clientForm.getRawValue();

    console.log('Cliente listo para enviar:', clientData);

    setTimeout(() => {
      this.isSaving = false;
      this.saved.emit();
      this.closeClientModal();
    }, 800);
  }

  closeClientModal(): void {
    if (this.isSaving) {
      return;
    }

    this.resetForm();
    this.closed.emit();
  }

  resetForm(): void {
    this.clientForm.reset({
      nombres: '',
      apellidos: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      razonSocial: '',
      email: '',
      telefono: '',
      direccion: '',
      consentimientoDatos: false
    });
  }

  isInvalid(field: string): boolean {
    const control = this.clientForm.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  getErrorMessage(field: string): string {
    const control = this.clientForm.get(field);

    if (!control?.errors) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Este campo es obligatorio.';
    }

    if (control.hasError('requiredTrue')) {
      return 'Debes aceptar el tratamiento de datos.';
    }

    if (control.hasError('minlength')) {
      return `Debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`;
    }

    if (control.hasError('maxlength')) {
      return `No puede superar los ${control.errors['maxlength'].requiredLength} caracteres.`;
    }

    if (control.hasError('email')) {
      return 'Ingresa un correo electrónico válido.';
    }

    if (control.hasError('onlyLetters')) {
      return 'Solo se permiten letras y espacios.';
    }

    if (control.hasError('pattern')) {
      const type = this.clientForm.get('tipoDocumento')?.value;

      if (field === 'numeroDocumento') {
        if (type === 'DNI') {
          return 'El DNI debe tener exactamente 8 números.';
        }

        if (type === 'RUC') {
          return 'El RUC debe tener exactamente 11 números.';
        }

        if (type === 'CE') {
          return 'El CE solo debe contener letras y números.';
        }
      }

      if (field === 'telefono') {
        return 'El teléfono debe tener exactamente 9 números.';
      }
    }

    return 'El valor ingresado no es válido.';
  }
}