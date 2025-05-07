import { Routes } from '@angular/router';

// Componentes de la parte pública
import { HomeComponent } from './components/home/home.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Componentes de reservas
import {ReservationsComponent} from './components/reservations/reservations.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';

// Componentes de administración
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminRestaurantsComponent } from './components/admin-restaurants/admin-restaurants.component';
import { RestaurantFormComponent } from './components/restaurant-form/restaurant-form.component';
import { AdminUserFormComponent } from './components/admin-user-form/admin-user-form.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import {ProfileComponent} from './components/profile/profile.component';


export const routes: Routes = [
  // 🏠 Home público
  { path: '', component: HomeComponent },

  // 🔓 Autenticación pública
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 📋 Catálogo de restaurantes
  { path: 'restaurants',     component: RestaurantsComponent },
  { path: 'restaurants/:id', component: RestaurantDetailComponent },

  // 🔒 Reservas (solo usuarios logueados)
  {
    path: 'reservations',
    component: ReservationsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['cliente'] }
  },
  {
    path: 'reservations/new',
    component: ReservationFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['cliente'] }
  },
  {
    path: 'reservations/edit/:id',
    component: ReservationFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['cliente'] }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]  // opcional: solo usuarios logueados
  },


  // 🛠️ Gestión de restaurantes (solo propietarios)
  {
    path: 'admin/restaurants',
    component: AdminRestaurantsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['propietario'] }
  },
  {
    path: 'admin/restaurants/new',
    component: RestaurantFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['propietario'] }
  },
  {
    path: 'admin/restaurants/edit/:id',
    component: RestaurantFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['propietario'] }
  },

  // ⚙️ Dashboard general de administración (solo admins)
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/users/new',
    component: AdminUserFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },

  // 🔄 Cualquier otra ruta → Home
  { path: '**', redirectTo: '' }
];
