import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: any[] = [];

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantsService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data.data; // ✅ Respuesta exitosa
        console.log('✅ Restaurantes obtenidos correctamente:', this.restaurants);
      },
      error: (error) => {
        console.error('❌ Error al obtener restaurantes:', error);
        alert('Error al obtener restaurantes: ' + error.error.message);
      },
      complete: () => {
        console.log('🎉 Petición completada con éxito');
      }
    });
  }
}
