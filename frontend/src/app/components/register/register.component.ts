import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  phone = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.error = '';
    this.auth.register(this.username, this.email, this.password, this.phone).subscribe({
      next: () => {
        alert('Registro exitoso');
        this.router.navigate(['/']);
      },
      error: err => {
        this.error = err.error?.message || 'Error en registro';
      }
    });
  }
}
