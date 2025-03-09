import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.myLocarStorage('getItem', 'token');
  if (typeof token === 'string') {
    req = req.clone({
      setHeaders: {
        token: token,
      },
    });
  }
  return next(req);
};
