import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [RouterLink, FormsModule, NavbarComponent],
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  allRestaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchQuery: string = '';

  constructor(private rs: RestaurantsService) {}

  ngOnInit(): void {
    this.rs.getRestaurants().subscribe(res => {
      this.allRestaurants = res.data || res;
      this.applySearch();
    });
  }

  onSearchChange(): void {
    this.applySearch();
  }

  private applySearch() {
    const term = this.searchQuery.toLowerCase();
    this.filteredRestaurants = this.allRestaurants.filter(r =>
      !term ||
      r.nombre.toLowerCase().includes(term) ||
      r.ubicacion.toLowerCase().includes(term) ||
      r.tipoComida.toLowerCase().includes(term)
    );
  }
}
