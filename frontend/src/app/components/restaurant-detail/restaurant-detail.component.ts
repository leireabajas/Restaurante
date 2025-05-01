import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './restaurant-detail.component.html',
  styleUrl: './restaurant-detail.component.css'
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: any = null;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantsService: RestaurantsService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.restaurantsService.getRestaurantById(this.id).subscribe({
        next: (data) => {
          this.restaurant = data.data || data; // según cómo devuelve tu API
        },
        error: () => {
          alert('Error al cargar el restaurante');
          this.router.navigate(['/restaurants']);
        }
      });
    }
  }
}
