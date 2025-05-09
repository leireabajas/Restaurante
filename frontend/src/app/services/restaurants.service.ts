import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getRestaurants(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/restaurants`);
  }

  getRestaurantById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/restaurants/${id}`);
  }

  createRestaurant(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/restaurants`, data);
  }

  updateRestaurant(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/restaurants/${id}`, data);
  }

  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/restaurants/${id}`)
  }



  getMyRestaurants(): Observable<{ status: string; data: any[] }> {
    return this.http.get<{ status: string; data: any[] }>(
      `${this.apiUrl}/restaurants/mis`
    );
  }

}
