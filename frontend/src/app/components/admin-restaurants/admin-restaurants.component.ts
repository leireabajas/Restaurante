import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-restaurants',
  standalone: true,
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css'],
  imports: [RouterLink],
})
export class AdminRestaurantsComponent implements OnInit {
  restaurants: any[] = [];

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.restaurantsService.getRestaurants()
      .subscribe(res => this.restaurants = res.data);
  }

  deleteRestaurant(id: string) {
    if (!confirm('¿Eliminar este restaurante?')) return;
    this.restaurantsService.deleteRestaurant(id)
      .subscribe(() => this.loadAll());
  }
}
