import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { DatePipe, JsonPipe, NgFor } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  standalone: true,
  imports: [
    NgFor,
    DatePipe,
    JsonPipe,
    RouterLink
  ],
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];
  userRole: string = 'usuario';
  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    console.log('💥 Componente RESERVATIONS cargado');

    this.reservationsService.getReservations().subscribe({
      next: (data) => {
        const array = Array.isArray(data) ? data : data.data;
        console.log('📦 Datos recibidos:', array);
        this.reservations = array;
      },
      error: (error) => {
        console.error('❌ Error al obtener reservas:', error);
        alert('Error al obtener reservas');
      }
    });
  }

  deleteReservation(id: string): void {
    if (confirm('¿Estás seguro de cancelar esta reserva?')) {
      this.reservationsService.deleteReservation(id).subscribe({
        next: () => {
          alert('Reserva cancelada');
          this.reservations = this.reservations.filter(res => res._id !== id);
        },
        error: () => alert('Error al cancelar la reserva')
      });
    }
  }
}
