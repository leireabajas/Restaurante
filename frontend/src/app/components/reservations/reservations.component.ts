import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import {DatePipe, NgClass, TitleCasePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule, TitleCasePipe]
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];
  editingId: string | null = null;
  editData: any = {};
  horaInicio = '';
  horaFin = '';

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    const mensajeCancelacion = localStorage.getItem('reservaCancelada');
    if (mensajeCancelacion) {
      alert('❌ Una de tus reservas ha sido cancelada por el restaurante.');
      localStorage.removeItem('reservaCancelada');
    }
    this.loadReservations();
  }


  loadReservations(): void {
    this.reservationsService.getReservations().subscribe({
      next: data => {
        console.log('📥 Reservas cargadas para cliente:', data);
        this.reservations = data;
      },
      error: () => alert('Error al obtener reservas')
    });
  }

  startEdit(reservation: any): void {
    this.editingId = reservation._id;
    this.editData = {
      fecha: reservation.fecha,
      hora: reservation.hora,
      numeroPersonas: reservation.numeroPersonas
    };
    const horario = reservation.restaurante?.horario;
    if (horario) {
      const [inicio, fin] = horario.split(' - ');
      this.horaInicio = inicio;
      this.horaFin = fin;
    } else {
      this.horaInicio = '';
      this.horaFin = '';
    }
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editData = {};
  }

  saveEdit(id: string): void {
    this.reservationsService.updateReservation(id, this.editData).subscribe({
      next: () => {
        alert('Reserva actualizada');
        this.editingId = null;
        this.loadReservations();
      },
      error: err => alert('Error al actualizar reserva: ' + err.error?.message)
    });
  }

  deleteReservation(id: string): void {
    console.log('🧨 Cancelando reserva ID:', id);  // ⬅️ Este log debe aparecer en consola

    if (!confirm('¿Seguro que deseas cancelar esta reserva?')) return;

    this.reservationsService.deleteReservation(id).subscribe({
      next: () => {
        console.log('🗑️ Reserva eliminada');
        this.loadReservations();
      },
      error: err => {
        console.error('❌ Error eliminando reserva', err);
        alert('Error al eliminar reserva');
      }
    });

  }

}
