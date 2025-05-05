

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface AuthResponse {
  access_token: string;
}

interface JwtPayload {
  sub: string;
  email: string;
  role: 'usuario' | 'admin';
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /** LOGIN */
  login(identifier: string, password: string) {
    return this.http.post<{ access_token: string }>(
      `${environment.apiUrl}/auth/login`,
      { identifier, password }
    );
  }

  /** REGISTER */
  register(username: string, email: string, password: string, phone?: string) {
    return this.http.post<{ access_token: string }>(
      `${environment.apiUrl}/auth/register`,
      { username, email, password, phone }
    );
  }


  /** Guarda el token en localStorage */
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /** Recupera el token de localStorage */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Borra el token (logout) */
  logout(): void {
    localStorage.removeItem('token');
  }

  /** Decodifica el JWT y extrae el email */
  getUserEmail(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]));
      return payload.email;
    } catch {
      return null;
    }
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as any;
      return payload.username;
    } catch {
      return null;
    }
  }

  /** Decodifica el JWT y extrae el role */
  getUserRole(): 'usuario' | 'admin' | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  }
  changePassword(currentPassword: string, newPassword: string) {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.http.post<{ message: string }>(
      `${environment.apiUrl}/auth/change-password`,
      { currentPassword, newPassword },
      { headers }
    );
  }


}
