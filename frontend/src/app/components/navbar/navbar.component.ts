import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    NgClass
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string | null = null;
  menuAbierto: boolean = false;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.auth.getUser();
    this.username = user?.nombre || user?.email || null;
  }

  onLogout(): void {
    this.auth.logout();
    this.username = null;
    this.menuAbierto = false;
    this.router.navigate(['/']);
  }
}
