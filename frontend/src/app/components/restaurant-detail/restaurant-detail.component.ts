import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService }     from '../../services/restaurants.service';
import { AuthService }            from '../../services/auth.service';

@Component({
  selector: 'app-restaurant-detail',
  standalone: true,
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
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
      // Usuario logueado → formulario de reserva con query param
      this.router.navigate(['/new-reservation'], {
        queryParams: { restaurante: this.restaurant._id }
      });
    } else {
      // No logueado → lo llevamos al login antes de reservar
      this.router.navigate(['/login'], {
        queryParams: { redirect: `/restaurant-detail/${this.restaurant._id}` }
      });
    }
  }
}

