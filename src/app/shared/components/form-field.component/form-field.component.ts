import { Component, Input, ContentChild, ElementRef, AfterContentInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {
  @Input() label: string = '';
  @Input() errorMessage: string = '';
  @Input() hasError: boolean | null | undefined = false;

  // Detecta el input nativo que se inyectará con la referencia #formInput desde las vistas
  @ContentChild('formInput', { static: false }) inputEl!: ElementRef<HTMLInputElement>;

  isFocused: boolean = false;

  // Manejadores de eventos guardados para poder removerlos en el ciclo de vida OnDestroy
  private focusListener = () => this.isFocused = true;
  private blurListener = () => this.isFocused = false;

  ngAfterContentInit(): void {
    if (this.inputEl && this.inputEl.nativeElement) {
      const element = this.inputEl.nativeElement;
      element.addEventListener('focus', this.focusListener);
      element.addEventListener('blur', this.blurListener);
    }
  }

  ngOnDestroy(): void {
    if (this.inputEl && this.inputEl.nativeElement) {
      const element = this.inputEl.nativeElement;
      element.removeEventListener('focus', this.focusListener);
      element.removeEventListener('blur', this.blurListener);
    }
  }
}