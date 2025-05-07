import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username   = '';
  email      = '';
  password   = '';
  phone      = '';
  inviteCode = '';

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  onRegister() {
    this.auth.register(
      this.username,
      this.email,
      this.password,
      this.phone || undefined,
      this.inviteCode || undefined
    ).subscribe({
      next: () => {
        alert('✅ Registro exitoso');
        this.router.navigate(['/restaurants']);
      },
      error: err => {
        alert('❌ ' + (err.error?.message || 'Error al registrarte'));
      }
    });
  }


}
