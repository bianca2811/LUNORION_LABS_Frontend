/* // Original
import { Component } from '@angular/core';

@Component({
  selector: 'app-employees-form',
  standalone: true,
  templateUrl: './employees-form.html',
  styleUrls: ['./employees-form.scss']
})
export class EmployeesForm {}*/


// V1
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employees-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees-form.html',
  styleUrls: ['./employees-form.scss']
})
export class EmployeesFormComponent implements OnInit {

  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: [''],
      employeeType: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  guardarEmpleado(): void {
    if (this.employeeForm.valid) {
      console.log('Guardando empleado de manera exitosa:', this.employeeForm.getRawValue());
      this.regresarAlListado();
    }
  }

  regresarAlListado(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
