import { CanActivateFn, Router } from '@angular/router';
import { getLocalStorage } from '../../shared/utils/storage';
import { TOKEN } from '../../shared/constants/core';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const token = getLocalStorage(TOKEN);
  if(token) {
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
