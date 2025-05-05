import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'http://localhost:3000'; // ajusta tu base

  constructor(private http: HttpClient) {}

  /** Llama a tu endpoint PATCH /users/:id */
  updateProfile(data: { username: string; email: string }) {
    const userId = this.getCurrentUserId();  // extrae del token o localStorage
    return this.http.patch<{ message: string }>(
      `${this.apiUrl}/users/${userId}`,
      data
    );
  }

  private getCurrentUserId(): string {
    return this.getTokenPayload()?.sub || '';
  }

  private getTokenPayload(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }
}
