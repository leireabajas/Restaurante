import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-restaurants',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnInit {
  restaurants: any[] = [];

  constructor(private svc: RestaurantsService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.svc.getRestaurants()  // recuerda en tu service incluir el header con token admin
      .subscribe(res => this.restaurants = res.data);
  }

  delete(id: string) {
    if (!confirm('¿Eliminar este restaurante?')) return;
    this.svc.deleteRestaurant(id)
      .subscribe(() => this.load());
  }
}
