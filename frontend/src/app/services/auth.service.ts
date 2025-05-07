import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';


interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: 'cliente' | 'propietario' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string,
    phone?: string,
    inviteCode?: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/auth/register`,
      { username, email, password, phone, inviteCode }
    );
  }

  login(identifier: string, password: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      `${this.apiUrl}/auth/login`,
      { identifier, password }
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserRole(): 'cliente' | 'propietario' | 'admin' | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = jwtDecode<JwtPayload>(token);
      return payload.role;
    } catch {
      return null;
    }
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = jwtDecode<JwtPayload>(token);
      return payload.username;
    } catch {
      return null;
    }
  }

  getUserId(): string {
    const token = this.getToken();
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }
  getTokenPayload(): any {
    const token = this.getToken();
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }

}
