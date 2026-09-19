import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SupplierStore } from '../../data-access/state/supplier.store';
import { SupplierHttpService } from '../../data-access/api/supplier-http.service';
import { SupplierRepository } from '../../domain/ports/supplier-repository';

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, TableModule, TagModule, ConfirmDialogModule],
  providers: [
    { provide: SupplierRepository, useClass: SupplierHttpService },
    ConfirmationService
  ],
  templateUrl: './suppliers-list.html',
  styleUrls: ['./suppliers-list.scss']
})
export class SuppliersList implements OnInit {
  readonly store = inject(SupplierStore);
  private readonly repository = inject(SupplierRepository);
  private readonly router = inject(Router);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.store.setLoading(true);
    this.store.setError(null);

    this.repository.getAll().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (suppliers) => {
        console.log('📦 Proveedores recibidos del backend:', suppliers);
        if (suppliers.length > 0) {
          console.log('🔍 Primer proveedor:', JSON.stringify(suppliers[0], null, 2));
        }
        this.store.setSuppliers(suppliers);
        this.store.setLoading(false);
      },
      error: (err) => {
        this.store.setLoading(false);
        this.store.setError(err.error?.message || 'Error al cargar proveedores');
      }
    });
  }

  onView(id: string): void {
    this.router.navigate(['/dashboard/suppliers', id]);
  }

  onEdit(id: string): void {
    this.router.navigate(['/dashboard/suppliers', id, 'edit']);
  }

  onDeactivate(supplier: { id: string; razonSocial: string }): void {
    this.confirmationService.confirm({
      message: `¿Estás seguro de desactivar al proveedor "${supplier.razonSocial}"?`,
      header: 'Confirmar Desactivación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.repository.deactivate(supplier.id).pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe({
          next: () => {
            this.loadSuppliers();
          },
          error: (err) => {
            this.store.setError(err.error?.message || 'Error al desactivar proveedor');
          }
        });
      }
    });
  }

  onNew(): void {
    this.router.navigate(['/dashboard/suppliers/new']);
  }
}
