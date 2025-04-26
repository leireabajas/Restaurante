import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    FormsModule
  ],
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationsService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data.data; // 📌 Asegúrate de que la API devuelve `{ status: 'Ok', data: [...] }`
      },
      error: () => alert('Error al obtener reservas')
    });
  }

  deleteReservation(id: string): void {
    if (confirm('¿Estás seguro de cancelar esta reserva?')) {
      this.reservationsService.deleteReservation(id).subscribe({
        next: () => {
          alert('Reserva eliminada');
          this.reservations = this.reservations.filter(res => res._id !== id);
        },
        error: () => alert('Error al eliminar la reserva')
      });
    }
  }

  searchQuery: string = '';

  filterReservations(): any[] {
    if (!this.searchQuery) {
      return this.reservations;
    }
    return this.reservations.filter(reservation =>
      reservation.usuario.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

}
