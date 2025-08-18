import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  private http = inject(HttpClient);

  private buildOptions(options?: {
    params?: { [key: string]: any };
    headers?: { [key: string]: string };
    observe?: 'body' | 'response';
    responseType?: 'json' | 'text' | 'blob';
  }): any {
    let httpOptions: any = { };

    if (options?.params) {
      httpOptions.params = new HttpParams({ fromObject: options.params });
    }
    if (options?.headers) {
      httpOptions.headers = new HttpHeaders(options.headers);
    }
    if (options?.observe) {
      httpOptions.observe = options.observe;
    }
    if (options?.responseType) {
      httpOptions.responseType = options.responseType;
    }

    return httpOptions;
  }

  get<T>(
    url: string,
    options?: {
      params?: { [key: string]: any };
      headers?: { [key: string]: string };
      observe?: 'body' | 'response';
      responseType?: 'json' | 'text' | 'blob';
    }
  ) {
    return this.http.get<T>(url, this.buildOptions(options));
  }

  post<T>(
    url: string,
    body: any,
    options?: {
      params?: { [key: string]: any };
      headers?: { [key: string]: string };
      observe?: 'body' | 'response';
      responseType?: 'json' | 'text' | 'blob';
      withCredentials?: boolean;
    },
    
  ) {
    return this.http.post<T>(url, body, this.buildOptions(options));
  }

  put<T>(
    url: string,
    body: any,
    options?: {
      params?: { [key: string]: any };
      headers?: { [key: string]: string };
      observe?: 'body' | 'response';
      responseType?: 'json' | 'text' | 'blob';
    }
  ) {
    return this.http.put<T>(url, body, this.buildOptions(options));
  }

  delete<T>(
    url: string,
    options?: {
      params?: { [key: string]: any };
      headers?: { [key: string]: string };
      observe?: 'body' | 'response';
      responseType?: 'json' | 'text' | 'blob';
    }
  ) {
    return this.http.delete<T>(url, this.buildOptions(options));
  }
}
