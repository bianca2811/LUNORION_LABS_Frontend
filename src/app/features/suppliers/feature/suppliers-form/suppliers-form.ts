import { Component, inject, OnInit, DestroyRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SupplierStore } from '../../data-access/state/supplier.store';
import { SupplierHttpService } from '../../data-access/api/supplier-http.service';
import { SupplierRepository } from '../../domain/ports/supplier-repository';
import { TenantService } from '../../../../core/tenant/tenant.service';

@Component({
  selector: 'app-suppliers-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule],
  providers: [
    { provide: SupplierRepository, useClass: SupplierHttpService }
  ],
  templateUrl: './suppliers-form.html',
  styleUrls: ['./suppliers-form.scss']
})
export class SuppliersForm implements OnInit {
  readonly store = inject(SupplierStore);
  private readonly fb = inject(FormBuilder);
  private readonly repository = inject(SupplierRepository);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly tenantService = inject(TenantService);

  readonly isEdit = this.route.snapshot.paramMap.has('id');
  readonly supplierId = this.route.snapshot.paramMap.get('id');
  readonly tenantId = signal<string | null>(null);
  readonly tenantLoading = signal(true);
  private isSubmitting = false;

  readonly form = this.fb.group({
    ruc: ['', [Validators.required]],
    razonSocial: ['', [Validators.required]],
    contacto: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    direccion: ['', [Validators.required]],
    condicionesPago: ['', [Validators.required]],
  });

  ngOnInit(): void {
    // Obtener tenantId automáticamente
    const tid = this.tenantService.getTenantId();
    this.tenantId.set(tid);
    this.tenantLoading.set(false);

    if (!tid) {
      this.store.setError('No se pudo obtener el tenant. Por favor, cierra sesión y vuelve a iniciar.');
    }

    if (this.isEdit && this.supplierId) {
      this.loadSupplier(this.supplierId);
    }
  }

  loadSupplier(id: string): void {
    this.store.setLoading(true);
    this.repository.getById(id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (supplier) => {
        this.form.patchValue(supplier);
        this.store.setLoading(false);
      },
      error: (err) => {
        this.store.setLoading(false);
        this.store.setError(err.error?.message || 'Error al cargar proveedor');
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting) return;

    const currentTenantId = this.tenantId();
    if (!currentTenantId) {
      this.store.setError('No se pudo obtener el tenant. Por favor, cierra sesión y vuelve a iniciar.');
      return;
    }

    this.isSubmitting = true;
    this.store.setLoading(true);
    this.store.setError(null);

    const supplierData = {
      ...this.form.value,
      tenantId: currentTenantId
    } as Omit<import('../../domain/models/supplier').Supplier, 'id' | 'activo'>;

    console.log('📤 Enviando al backend:', JSON.stringify(supplierData, null, 2));

    if (this.isEdit && this.supplierId) {
      this.store.setLoading(false);
      this.store.setError('La edición no está soportada por el backend actual');
      return;
    }

    this.repository.create(supplierData).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.store.setLoading(false);
        this.router.navigate(['/dashboard/suppliers']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.store.setLoading(false);
        console.error('❌ Error del backend:', err);
        console.error('❌ Error body:', err.error);
        this.store.setError(err.error?.message || err.error?.error || `Error ${err.status}: ${err.statusText}`);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/suppliers']);
  }
}
