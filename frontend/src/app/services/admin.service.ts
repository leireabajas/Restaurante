import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/admin'; // Ajusta si tu base de URL es diferente

  constructor(private http: HttpClient) {}

  // Obtener estadísticas generales
  getEstadisticas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estadisticas`);
  }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/users`);
  }

  // Obtener todos los restaurantes
  getRestaurantes(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/restaurants`);
  }

  // Obtener todas las reservas
  getReservas(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/reservations`);
  }
}
