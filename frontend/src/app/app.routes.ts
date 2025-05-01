import { Routes } from '@angular/router';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';  // <-- nuestro nuevo guard

export const routes: Routes = [
  // Público
// 🔓 PÚBLICAS
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // 📋 Restaurantes
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'restaurant-detail/:id', component: RestaurantDetailComponent },

  // 🔒 Reservas (sólo usuarios logueados)
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-reservation',
    component: ReservationFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-reservation/:id',
    component: ReservationFormComponent,
    canActivate: [AuthGuard]
  },

  // 🛠️ Restaurantes (crear/editar) → admins only
  {
    path: 'new-restaurant',
    component: RestaurantFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'edit-restaurant/:id',
    component: RestaurantFormComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  // ⚙️ Panel admin general → admins only
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  // 🔄 CUALQUIER OTRA → restaurantes
  { path: '**', redirectTo: 'restaurants' }
];
