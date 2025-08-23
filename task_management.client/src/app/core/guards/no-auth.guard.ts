import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getLocalStorage } from '../../shared/utils/storage';
import { TOKEN } from '../../shared/constants/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const token = getLocalStorage(TOKEN);
  if(token) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
