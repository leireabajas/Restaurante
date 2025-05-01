import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { RouterLink } from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent
  ],
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  searchQuery: string = '';

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantsService.getRestaurants().subscribe({
      next: (data) => {
        this.restaurants = data.data;
      },
      error: (error) => {
        alert('Error al obtener restaurantes: ' + error.error.message);
      }
    });
  }

  filterRestaurants(): any[] {
    if (!this.searchQuery.trim()) {
      return this.restaurants;
    }
    return this.restaurants.filter(restaurant =>
      restaurant.nombre.toLowerCase().startsWith(this.searchQuery.toLowerCase())
    );
  }

  // Función que recibe la búsqueda del navbar
  updateSearchQuery(query: string) {
    this.searchQuery = query;
  }
}
