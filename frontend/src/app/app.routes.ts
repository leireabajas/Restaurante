import { Routes } from '@angular/router';

import { HomeComponent }                from './components/home/home.component';
import { RestaurantsComponent }         from './components/restaurants/restaurants.component';
import { RestaurantFormComponent }      from './components/restaurant-form/restaurant-form.component';
import { ReservationsComponent }        from './components/reservations/reservations.component';
import { ReservationFormComponent }     from './components/reservation-form/reservation-form.component';
import { AdminDashboardComponent }      from './components/admin-dashboard/admin-dashboard.component';
import { RestaurantDetailComponent }    from './components/restaurant-detail/restaurant-detail.component';
import { LoginComponent }               from './components/login/login.component';
import { RegisterComponent }            from './components/register/register.component';
import { ContactComponent }             from './components/contact/contact.component';
import { AboutComponent }               from './components/about/about.component';
import { HelpComponent }                from './components/help/help.component';
import { ProfileComponent }             from './components/profile/profile.component';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // 🏠 Home público
  { path: '', component: HomeComponent },

  // 🔓 Autenticación pública
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 📋 Páginas informativas
  { path: 'contact', component: ContactComponent },
  { path: 'about',   component: AboutComponent },
  { path: 'help',    component: HelpComponent },

  // 🍽️ Restaurantes (catálogo y detalle)
  { path: 'restaurants',           component: RestaurantsComponent },
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

  // 🛠️ Gestión de restaurantes (admins)
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

  // 👤 Perfil de usuario (sólo logueados)
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  // ⚙️ Panel admin general
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard]
  },

  // 🔄 Cualquier otra → home
  { path: '**', redirectTo: '' }
];
