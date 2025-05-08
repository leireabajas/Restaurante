import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  restaurant = {
    nombre: '',
    direccion: '',
    ubicacion: '',
    tipoComida: '',
    capacidad: 0,
    horario: '',
    descripcion: '',
    imagen: ''
  };
  id: string | null = null;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.restaurantsService.getRestaurantById(this.id).subscribe({
        next: (data) => this.restaurant = data,
        error: () => alert('Error al obtener los datos del restaurante')
      });
    }
  }

  onSubmit(): void {
    if (this.id) {
      this.restaurantsService.updateRestaurant(this.id, this.restaurant).subscribe({
        next: () => {
          alert('Restaurante actualizado correctamente');
          this.router.navigate(['/admin/restaurants']);
        },
        error: (err) => alert('Error al actualizar: ' + err.error.message)
      });
    } else {
      this.restaurantsService.createRestaurant(this.restaurant).subscribe({
        next: () => {
          alert('Restaurante creado exitosamente');
          this.router.navigate(['/admin/restaurants']);
        },
        error: (err) => alert('Error al crear: ' + err.error.message)
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      alert(`La imagen supera los ${maxSizeMB}MB permitidos.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.restaurant.imagen = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
