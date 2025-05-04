// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  identifier: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.error = '';
    console.log('🔑 Intentando login con:', {
      identifier: this.identifier,
      password: this.password
    });
    this.authService.login(this.identifier, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.access_token);
        alert('✅ Login exitoso');
        this.router.navigate(['/restaurants']);
      },
      error: (err) => {
        console.error('❌ Error login:', err);
        this.error = err.error?.message || 'Error en login';
      }
    });
  }
}
