
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  exp?: number;
}

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.auth.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role === 'admin') {
        return true;
      } else {
        alert(' Sólo admins pueden entrar aquí');
        this.router.navigate(['/restaurants']);
        return false;
      }
    } catch {
      console.error('⚠Token inválido ');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
