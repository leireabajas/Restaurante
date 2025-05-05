// src/app/app.routes.ts
import { Routes } from '@angular/router';

// 🌐 Público
import { HomeComponent }            from './components/home/home.component';
import { LoginComponent }           from './components/login/login.component';
import { RegisterComponent }        from './components/register/register.component';

// 📋 Catálogo y detalle
import { RestaurantsComponent }     from './components/restaurants/restaurants.component';
import { RestaurantDetailComponent }from './components/restaurant-detail/restaurant-detail.component';

// 🔒 Reservas (usuarios autenticados)
import { ReservationsComponent }    from './components/reservations/reservations.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';

// ⚙️ Administración
import { AdminDashboardComponent }  from './components/admin-dashboard/admin-dashboard.component';
import { AdminRestaurantsComponent }   from './components/admin-restaurants/admin-restaurants.component';
import { RestaurantFormComponent }  from './components/restaurant-form/restaurant-form.component';
import { UsersComponent }           from './components/users/users.component';
import { ReservationsAdminComponent } from './components/reservations-admin/reservations-admin.component';

// 🛡️ Guards
import { AuthGuard }  from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // 🏠 Home público
  { path: '', component: HomeComponent },

  // 🔓 Autenticación
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 📋 Restaurantes (público)
  { path: 'restaurants',          component: RestaurantsComponent },
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

  // ⚙️ Panel de Administración (sólo admins)
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      // redirige al listado de restaurantes admin
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' },

      // 🛠️ Gestión de Restaurantes
      { path: 'restaurants',                   component: AdminRestaurantsComponent },
      { path: 'restaurants/new-restaurant',    component: RestaurantFormComponent, canActivate: [AuthGuard, AdminGuard] },
      { path: 'restaurants/edit-restaurant/:id', component: RestaurantFormComponent, canActivate: [AuthGuard, AdminGuard] },

      // 👥 Gestión de Usuarios
      { path: 'users',                         component: UsersComponent },

      // 📅 Gestión de Reservas
      { path: 'reservations-admin',            component: ReservationsAdminComponent },
    ]
  },

  // 🔄 Cualquier otra ruta → Home
  { path: '**', redirectTo: '' }
];
