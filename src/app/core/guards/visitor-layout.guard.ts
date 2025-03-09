import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const visitorLayoutGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.myLocarStorage('check', 'token')) {
    router.navigate(['home']);
    return false;
  } else {
    return true;
  }
};
