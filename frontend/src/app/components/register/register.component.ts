import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  role: string = 'usuario';  // cambia si quieres seleccionar rol

  constructor(private auth: AuthService, private router: Router) {}

  onRegister(): void {
    this.auth.register(this.email, this.password, this.role)
      .subscribe({
        next: res => {
          this.auth.saveToken(res.access_token);
          alert('✅ ¡Registro exitoso! Bienvenid@ 😀');
          this.router.navigate(['/restaurants']);
        },
        error: err => {
          alert('❌ Error al registrar: ' + err.error.message);
        }
      });
  }
}
