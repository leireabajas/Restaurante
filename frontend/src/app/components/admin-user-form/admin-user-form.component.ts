import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-user-form.component.html',
  styleUrls: ['./admin-user-form.component.css']
})
export class AdminUserFormComponent {
  username = '';
  email    = '';
  password = '';
  phone?   = '';

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}


}
