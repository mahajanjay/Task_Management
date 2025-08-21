import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../../shared/models/core/Register';
import { environment } from '../../../environments/environment.development';
import { API_ENDPOINTS } from '../../shared/utils/api-endpoints';
import { Login } from '../../shared/models/core/Login';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private http = inject(HttpClient);

  BASE_URL = environment.apiBaseUrl;

  register(data: Register) {
    return this.http.post(`${this.BASE_URL}/${API_ENDPOINTS.USER}`, data);
  }

  login(data: Login) {
    return this.http.post(`${this.BASE_URL}/${API_ENDPOINTS.AUTH}/login`, data);
  }
  
}
