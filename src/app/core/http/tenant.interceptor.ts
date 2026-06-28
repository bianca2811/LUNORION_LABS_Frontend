import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TenantService } from '../tenant/tenant.service';
import { environment } from '../../../environments/environment';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const tenant = inject(TenantService);
  const tenantId = tenant.tenantId();

  if (tenantId) {
    const cloned = req.clone({
      headers: req.headers.set(environment.tenantKey, tenantId),
    });
    return next(cloned);
  }

  return next(req);
};
