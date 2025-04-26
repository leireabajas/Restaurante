import { Routes } from '@angular/router';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  // 📌 Rutas de Restaurantes
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'new-restaurant', component: RestaurantFormComponent },
  { path: 'edit-restaurant/:id', component: RestaurantFormComponent },

  // 📌 Rutas de Reservas
  { path: 'reservations', component: ReservationsComponent },
  { path: 'new-reservation', component: ReservationFormComponent },
  { path: 'edit-reservation/:id', component: ReservationFormComponent },

  // 📌 Panel de Administración
  { path: 'admin', component: AdminDashboardComponent },

  // 📌 Redirigir a restaurantes por defecto
  { path: '**', redirectTo: 'restaurants' }
];
