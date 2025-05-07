import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'http://localhost:3000'; // ajusta tu base

  constructor(private http: HttpClient) {}


  private getTokenPayload(): any {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }

  getUserById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }




}
