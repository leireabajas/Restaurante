import { Component, OnInit } from '@angular/core';
import {ReservationsService} from '../../services/reservations.service';


@Component({
  selector: 'app-reservations-admin',
  templateUrl: './reservations-admin.component.html',
  styleUrls: ['./reservations-admin.component.css']
})
export class ReservationsAdminComponent implements OnInit {
  reservas: any[] = [];

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    this.reservationsService.getReservasPropietario().subscribe({
      next: (data: any[]) => this.reservas = data,
      error: (err: any) => console.error('Error al cargar reservas del propietario', err)
    });
  }
}
