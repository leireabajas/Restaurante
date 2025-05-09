import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
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
  imageTooLarge = false;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.restaurantsService.getRestaurantById(this.id).subscribe({
        next: data => this.restaurant = data,
        error: () => alert('Error al obtener los datos del restaurante')
      });
    }
  }

  onSubmit(): void {
    if (this.imageTooLarge) {
      alert('La imagen es demasiado grande');
      return;
    }

    const serviceCall = this.id
      ? this.restaurantsService.updateRestaurant(this.id, this.restaurant)
      : this.restaurantsService.createRestaurant(this.restaurant);

    serviceCall.subscribe({
      next: () => {
        alert(this.id ? 'Restaurante actualizado' : 'Restaurante creado');
        this.router.navigate(['/admin/restaurants']);
      },
      error: err => alert('Error al guardar: ' + err.error?.message)
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const maxSizeMB = 1;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    this.imageTooLarge = file.size > maxSizeBytes;
    if (this.imageTooLarge) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.restaurant.imagen = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


}
