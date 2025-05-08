import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-restaurants',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnInit {
  restaurants: any[] = [];
  editingId: string | null = null;
  restaurantForm: any = {
    nombre: '',
    direccion: '',
    ubicacion: '',
    tipoComida: '',
    capacidad: 0,
    horario: '',
    descripcion: '',
    imagen: ''
  };

  constructor(
    private svc: RestaurantsService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    const propietarioId = this.auth.getUserId();
    this.svc.getMyRestaurants().subscribe({
      next: (res: { data: any[] }) => this.restaurants = res.data,
      error: () => alert('Error al cargar tus restaurantes')
    });
  }

  delete(id: string) {
    if (!confirm('¿Eliminar este restaurante?')) return;
    this.svc.deleteRestaurant(id).subscribe({
      next: () => this.load(),
      error: () => alert('No se pudo eliminar el restaurante')
    });
  }

  startEdit(restaurant: any) {
    this.editingId = restaurant._id;
    this.restaurantForm = { ...restaurant };
  }
  saveEdit() {
    if (!this.editingId) return;

    this.svc.updateRestaurant(this.editingId, this.restaurantForm).subscribe({
      next: () => {
        alert('✅ Restaurante actualizado');
        this.editingId = null;
        this.load(); // 🔁 vuelve a cargar la lista actualizada
      },
      error: () => alert('❌ Error al actualizar')
    });
  }


  onImageFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.restaurantForm.imagen = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
