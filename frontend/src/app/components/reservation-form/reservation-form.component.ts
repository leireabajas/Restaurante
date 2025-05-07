import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';
import { RestaurantsService } from '../../services/restaurants.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservation = {
    restaurante: '',
    fecha: '',
    hora: '',
    numeroPersonas: 1
  };
  restaurants: any[] = [];
  id: string | null = null;
  horaInicio: string = '';
  horaFin: string = '';

  constructor(
      private reservationsService: ReservationsService,
      private restaurantsService: RestaurantsService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el parámetro 'restaurante' si existe
    this.route.queryParams.subscribe(params => {
      if (params['restaurante']) {
        this.reservation.restaurante = params['restaurante'];
        this.cargarHorarioRestaurante(params['restaurante']);
      }
    });

    // Si se está editando una reserva existente
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.reservationsService.getReservationById(this.id).subscribe({
        next: data => {
          this.reservation = {
            restaurante: data.restaurante._id || data.restaurante,
            fecha: data.fecha,
            hora: data.hora,
            numeroPersonas: data.numeroPersonas
          };
          this.cargarHorarioRestaurante(this.reservation.restaurante);
        },
        error: () => alert('Error al obtener la reserva')
      });
    }

    // Cargar la lista de restaurantes
    this.restaurantsService.getRestaurants().subscribe({
      next: data => this.restaurants = data.data,
      error: () => alert('Error al obtener restaurantes')
    });
  }

  cargarHorarioRestaurante(restauranteId: string): void {
    this.restaurantsService.getRestaurantById(restauranteId).subscribe({
      next: restaurante => {
        const [inicio, fin] = restaurante.horario.split(' - ');
        this.horaInicio = inicio;
        this.horaFin = fin;
      },
      error: () => alert('Error al obtener el horario del restaurante')
    });
  }

  onSubmit(): void {
    if (this.id) {
      this.reservationsService.updateReservation(this.id, this.reservation)
          .subscribe({
            next: () => {
              alert('Reserva actualizada correctamente');
              this.router.navigate(['/reservations']);
            },
            error: err => alert('Error al actualizar: ' + err.error.message)
          });
    } else {
      this.reservationsService.createReservation(this.reservation)
          .subscribe({
            next: () => {
              alert('Reserva creada exitosamente');
              this.router.navigate(['/reservations']);
            },
            error: err => alert('Error al crear: ' + err.error.message)
          });
    }
  }
}
