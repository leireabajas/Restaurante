import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  restaurant = {
    nombre: '',
    ubicacion: '',
    tipoComida: '',
    capacidad: 0,
    imagen: ''
  };
  id: string | null = null;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.restaurantsService.getRestaurantById(this.id).subscribe({
        next: (data) => (this.restaurant = data),
        error: () => alert('Error al obtener datos del restaurante')
      });
    }
  }

  onSubmit(): void {
    if (this.id) {
      this.restaurantsService.updateRestaurant(this.id, this.restaurant).subscribe({
        next: () => {
          alert('Restaurante actualizado correctamente');
          this.router.navigate(['/restaurants']);
        },
        error: (error) => alert('Error al actualizar: ' + error.error.message)
      });
    } else {
      this.restaurantsService.createRestaurant(this.restaurant).subscribe({
        next: () => {
          alert('Restaurante creado exitosamente');
          this.router.navigate(['/restaurants']);
        },
        error: (error) => alert('Error al crear: ' + error.error.message)
      });
    }
  }
}
