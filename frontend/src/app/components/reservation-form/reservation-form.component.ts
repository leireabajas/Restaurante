import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';
import { RestaurantsService } from '../../services/restaurants.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservation = {
    restaurante: '',
    fecha: '',
    numeroPersonas: 1
  };
  restaurants: any[] = [];
  id: string | null = null;

  constructor(
    private reservationsService: ReservationsService,
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    // Cargar los restaurantes disponibles
    this.restaurantsService.getRestaurants().subscribe({
      next: (data) => (this.restaurants = data.data),
      error: () => alert('Error al obtener restaurantes')
    });

    // Si hay un ID, significa que estamos editando una reserva
    if (this.id) {
      this.reservationsService.getReservationById(this.id).subscribe({
        next: (data) => (this.reservation = data),
        error: () => alert('Error al obtener la reserva')
      });
    }
  }

  onSubmit(): void {
    if (this.id) {
      this.reservationsService.updateReservation(this.id, this.reservation).subscribe({
        next: () => {
          alert('Reserva actualizada correctamente');
          this.router.navigate(['/reservations']);
        },
        error: (error) => alert('Error al actualizar: ' + error.error.message)
      });
    } else {
      this.reservationsService.createReservation(this.reservation).subscribe({
        next: () => {
          alert('Reserva creada exitosamente');
          this.router.navigate(['/reservations']);
        },
        error: (error) => alert('Error al crear: ' + error.error.message)
      });
    }
  }
}
