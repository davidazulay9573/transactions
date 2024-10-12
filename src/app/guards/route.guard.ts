import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';

export const routeGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const email = cookieService.get('email');
  const password = cookieService.get('password');

  if (authService.isLoggedIn()) {
    return true;
  } else if (email && password) {
    try {
      const response = await firstValueFrom(authService.signIn({ email, password }));
      console.log('Auto sign-in successful:', response);
      authService.handleSignIn(response.token);
      return true;
    } catch (error) {
      console.error('Auto sign-in error:', error);
      return false; 
    } finally {
      cookieService.delete('email');
      cookieService.delete('password');
    }
  } else {
    router.navigate(['/signin']);
    return false;
  }
};
