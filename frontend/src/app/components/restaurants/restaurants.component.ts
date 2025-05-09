import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  imports: [
    RouterLink,
    FormsModule,
    NgClass
  ],
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchQuery: string = '';
  foodTypes: string[] = [];
  selectedType: string = '';

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantsService.getRestaurants().subscribe({
      next: data => {
        this.restaurants = data.data;
        this.filteredRestaurants = [...this.restaurants];
        this.foodTypes = [...new Set(this.restaurants.map(r => r.tipoComida))];
      },
      error: err => {
        console.error('❌ Error al cargar restaurantes:', err);
      }
    });
  }

  onSearchChange(): void {
    this.filterRestaurants();
  }

  filterByType(type: string): void {
    this.selectedType = type === this.selectedType ? '' : type;
    this.filterRestaurants();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedType = '';
    this.filteredRestaurants = [...this.restaurants];
  }

  private filterRestaurants(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(r => {
      const matchesQuery =
        r.nombre.toLowerCase().includes(query) ||
        r.ubicacion.toLowerCase().includes(query) ||
        r.tipoComida.toLowerCase().includes(query);
      const matchesType = this.selectedType ? r.tipoComida === this.selectedType : true;
      return matchesQuery && matchesType;
    });
  }
}
