// src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService) {}


  get username(): string | null {
    return this.auth.getUsername();
  }

  onLogout() {
    this.auth.logout();
    window.location.href = '/';
  }
}
