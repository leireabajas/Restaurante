// src/app/services/reservations.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService }            from './auth.service';
import { Observable }             from 'rxjs';
import { environment }            from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private apiUrl = `${environment.apiUrl}/reservations`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  private authHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getReservations(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: this.authHeaders()
    });
  }

  getReservationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.authHeaders()
    });
  }

  createReservation(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, {
      headers: this.authHeaders()
    });
  }

  updateReservation(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, {
      headers: this.authHeaders()
    });
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.authHeaders()
    });
  }

  getReservasPropietario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis`, {
      headers: this.authHeaders()
    });
  }

}
