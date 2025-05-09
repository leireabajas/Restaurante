import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservations-admin',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './reservations-admin.component.html',
  styleUrls: ['./reservations-admin.component.css']
})
export class ReservationsAdminComponent implements OnInit {
  reservas: any[] = [];

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.getReservasPropietario().subscribe({
      next: data => {
        console.log('📦 Reservas recibidas:', data);
        this.reservas = data;
      },
      error: err => console.error('❌ Error al cargar reservas del propietario', err)
    });
  }


  cargarReservas(): void {
    this.reservationsService.getReservasPropietario().subscribe({
      next: data => {
        this.reservas = data.filter(reserva => reserva.estado !== 'cancelada');
      },
      error: err => console.error('Error al cargar reservas del propietario', err)
    });
  }


  cambiarEstado(id: string, nuevoEstado: 'confirmada' | 'cancelada'): void {
    if (nuevoEstado === 'cancelada') {
      // Confirmar la acción con el usuario
      if (!confirm('¿Estás seguro de que deseas cancelar y eliminar esta reserva?')) return;

      // Eliminar la reserva de la base de datos
      this.reservationsService.deleteReservation(id).subscribe({
        next: () => {
          alert('Reserva cancelada y eliminada correctamente.');
          this.cargarReservas();
        },
        error: err => alert('No se pudo eliminar la reserva: ' + err.message)
      });
    } else {
      // Cambiar el estado de la reserva sin eliminarla
      this.reservationsService.updateReservation(id, { estado: nuevoEstado }).subscribe({
        next: () => {
          alert('Estado de la reserva actualizado correctamente.');
          this.cargarReservas();
        },
        error: err => alert('No se pudo actualizar la reserva: ' + err.message)
      });
    }
  }



}
