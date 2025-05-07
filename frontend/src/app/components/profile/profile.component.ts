import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {AuthService} from '../../services/auth.service';
import {ReservationsService} from '../../services/reservations.service';
import {CommonModule, DatePipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = null;
  reservas: any[] = [];

  constructor(
    private usersService: UsersService,
    private auth: AuthService,
    private reservationsService: ReservationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    if (userId) {
      this.usersService.getUserById(userId).subscribe({
        next: (user) => this.userData = user,
        error: () => alert('Error al cargar los datos del usuario')
      });

      this.reservationsService.getReservations().subscribe({
        next: (data) => {
          this.reservas = Array.isArray(data) ? data : data.data;
        },
        error: () => alert('Error al cargar reservas')
      });
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
