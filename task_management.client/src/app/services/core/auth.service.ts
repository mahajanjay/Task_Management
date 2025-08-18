import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment.development';
import { API_ENDPOINTS } from '../../shared/utils/api-endpoints';
import { Register } from '../../shared/models/core/Register';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/core/ApiResponse';
import { Login } from '../../shared/models/core/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private apiService = inject(ApiService);

  BASE_URL = environment.apiBaseUrl;

  register(data: Register): Observable<ApiResponse<any>> {
    return this.apiService.post<ApiResponse<any>>(
      `${this.BASE_URL}/${API_ENDPOINTS.USER}`,
      data
    )
    .pipe(
      map((res: ApiResponse<any> | any) => res.data)
    )
  }

  login(data: Login): Observable<ApiResponse<any>> {
    return this.apiService.post<ApiResponse<any>>(
      `${this.BASE_URL}/${API_ENDPOINTS.AUTH}/login`,
      data,
    ).pipe(
      map((res: ApiResponse<any> | any) => res.data)
    );
  }

}
