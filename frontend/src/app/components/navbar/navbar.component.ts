// src/app/components/navbar/navbar.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() searchChanged = new EventEmitter<string>();
  searchQuery = '';
  userEmail: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userEmail = this.auth.getUserEmail();
  }

  onSearchChange() {
    this.searchChanged.emit(this.searchQuery);
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
