

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/login`,
      { email, password }
    );
  }

  /** REGISTER */
  register(
    email: string,
    password: string,
    role: 'usuario' | 'admin' = 'usuario'
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/register`,
      { email, password, role }
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
}
