// src/app/components/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  featured: any[] = [];
  foodTypes: string[] = [];

  constructor(
    private rs: RestaurantsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rs.getRestaurants().subscribe(res => {
      const list = (res.data || res) as any[];
      this.featured = list.slice(0, 4);
      // extrae tipos de comida únicos
      this.foodTypes = Array.from(new Set(list.map(r => r.tipoComida)));
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/restaurants'], { queryParams: { q: this.searchQuery } });
    }
  }

  filterByType(type: string): void {
    this.router.navigate(['/restaurants'], { queryParams: { tipo: type } });
  }

}
