import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  estadisticas: any = null;
  usuarios: any[] = [];
  visibleSection: 'usuarios' | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getEstadisticas().subscribe({
      next: (data) => (this.estadisticas = data),
      error: () => alert('Error al cargar estadísticas')
    });

    this.adminService.getUsuarios().subscribe({
      next: (data) => (this.usuarios = data),
      error: () => alert('Error al cargar usuarios')
    });
  }

  toggleSection(section: 'usuarios'): void {
    this.visibleSection = this.visibleSection === section ? null : section;
  }
}
