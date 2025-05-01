// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router }      from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    console.log('🔑 Intentando login con:', {
      email: this.email,
      password: this.password
    });
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.access_token);
        alert('✅ Login exitoso');
        this.router.navigate(['/restaurants']);
      },
      error: (error) => {
        console.error('❌ Error login:', error);
        alert('Error en login: ' + error.error.message);
      }
    });
  }
}
