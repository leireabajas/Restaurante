import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';
import { AuthService } from '../../services/auth.service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css'],
  imports: [
    NgClass,
    RouterLink
  ],
  standalone: true
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: any = null;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rs: RestaurantsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.auth.getToken();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.rs.getRestaurantById(id).subscribe({
        next: res => this.restaurant = res.data || res,
        error: () => alert('Error al cargar detalles del restaurante')
      });
    }
  }

  onReserve(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/reservations/new'], {
        queryParams: { restaurante: this.restaurant._id }
      });
    } else {
      this.router.navigate(['/login'], {
        queryParams: { redirect: `/restaurant-detail/${this.restaurant._id}` }
      });
    }
  }
}
