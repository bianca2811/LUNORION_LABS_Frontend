import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SupplierStore } from '../../data-access/state/supplier.store';
import { SupplierHttpService } from '../../data-access/api/supplier-http.service';
import { SupplierRepository } from '../../domain/ports/supplier-repository';

@Component({
  selector: 'app-suppliers-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, CardModule, TagModule],
  providers: [
    { provide: SupplierRepository, useClass: SupplierHttpService }
  ],
  templateUrl: './suppliers-details.html',
  styleUrls: ['./suppliers-details.scss']
})
export class SuppliersDetails implements OnInit {
  readonly store = inject(SupplierStore);
  private readonly repository = inject(SupplierRepository);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly supplierId = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    if (this.supplierId) {
      this.loadSupplier(this.supplierId);
    }
  }

  loadSupplier(id: string): void {
    this.store.setLoading(true);
    this.repository.getById(id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (supplier) => {
        this.store.setSelectedSupplier(supplier);
        this.store.setLoading(false);
      },
      error: (err) => {
        this.store.setLoading(false);
        this.store.setError(err.error?.message || 'Error al cargar proveedor');
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/dashboard/suppliers']);
  }

  onEdit(): void {
    if (this.supplierId) {
      this.router.navigate(['/dashboard/suppliers', this.supplierId, 'edit']);
    }
  }
}
