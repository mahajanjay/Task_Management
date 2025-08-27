import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment.development';
import { Register } from '../../shared/models/core/Register';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/core/ApiResponse';
import { Login } from '../../shared/models/core/Login';
import { removeLocalStorage, setLocalStorage } from '../../shared/utils/storage';
import { TOKEN } from '../../shared/constants/core';
import { LoggedInUserService } from './logged-in-user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private apiService = inject(ApiService);
  private loggedInUserService = inject(LoggedInUserService);
  private router = inject(Router);

  BASE_URL = environment.apiBaseUrl;

  register(data: Register): Observable<ApiResponse<any>> {
    return this.apiService.register(data).pipe(
      map((res: ApiResponse<any> | any) => res.data)
    )
  }

  login(data: Login): Observable<ApiResponse<any>> {
    return this.apiService.login(data).pipe(
      map((res: ApiResponse<any> | any) => {
        setLocalStorage(TOKEN, res.data.token);
        this.loggedInUserService.setLoggedInUser(res.data.token);
        return res.data.token;
      })
    );
  }

  logout() {
    removeLocalStorage(TOKEN);
    this.loggedInUserService.reset();
    this.router.navigate(['login']);
  }

}
