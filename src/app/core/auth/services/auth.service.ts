import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment.prod';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  constructor() {}
  register(data: any): Observable<any> {
    return this.http.post(environment.BASEURL + 'users/signup', data);
  }
  login(data: any): Observable<any> {
    return this.http.post(environment.BASEURL + 'users/signin', data);
  }
  myLocarStorage(
    method: 'setItem' | 'getItem' | 'check' | 'removeItem' | 'clear',
    key: string = '',
    value: string = ''
  ) {
    if (isPlatformBrowser(this.platformId)) {
      if (method === 'setItem') {
        localStorage.setItem(key, value);
        return;
      } else if (method === 'getItem') {
        return localStorage.getItem(key);
      } else if (method === 'check') {
        return !!localStorage.getItem(key);
      } else if (method === 'removeItem') {
        localStorage.removeItem(key);
        return;
      } else if (method === 'clear') {
        localStorage.clear();
      } else {
        return null;
      }
    }
    return;
  }
}
