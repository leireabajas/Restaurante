import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';
declare const google: any;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featured: any[] = [];


  constructor(
    private rs: RestaurantsService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.rs.getRestaurants().subscribe(res => {
      const list = (res.data || res) as any[];
      this.featured = list.slice(0, 4);
    });

    window.onload = () => {
      this.loadMap();
    };
  }


  loadMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          const map = new google.maps.Map(document.getElementById('map'), {
            center: coords,
            zoom: 14
          });

          new google.maps.Marker({
            position: coords,
            map,
            title: 'Tu ubicación'
          });
        },
        () => {
          alert('No se pudo obtener tu ubicación.');
        }
      );
    } else {
      alert('Tu navegador no admite geolocalización.');
    }
  }
}




