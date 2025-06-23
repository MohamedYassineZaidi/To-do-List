// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => localStorage.setItem('token', res.access_token))
    );
  }

  register(name: string, email: string, password: string, password_confirmation: string) {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password,password_confirmation  });
  }

  logout() {
    localStorage.removeItem('token');
  }
}