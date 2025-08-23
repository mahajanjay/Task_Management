import { HttpInterceptorFn } from '@angular/common/http';
import { getLocalStorage } from '../../shared/utils/storage';
import { TOKEN } from '../../shared/constants/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const token = getLocalStorage(TOKEN);
  if(token) {
    req = addToken(req, token);
  }

  return next(req);
};

const addToken = (req: any, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
} 
