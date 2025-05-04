import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: string | null = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.email = this.auth.getUserEmail();
  }

  onChangePassword() {
    this.message = '';
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.message = 'Por favor completa todos los campos.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'La contraseña nueva y su confirmación no coinciden.';
      return;
    }

    this.auth.changePassword(this.currentPassword, this.newPassword)
      .subscribe({
        next: res => {
          this.message = res.message || '¡Contraseña cambiada con éxito!';
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error: err => {
          this.message = err.error?.message || 'Error al cambiar la contraseña.';
        }
      });
  }

}
