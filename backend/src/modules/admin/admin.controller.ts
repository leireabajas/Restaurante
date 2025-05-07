import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';
import { RestaurantsService } from '../restaurants/restaurants.service'; // importa correctamente

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly restaurantsService: RestaurantsService // inyecta bien aquí
    ) {}

    @Get('estadisticas')
    async getEstadisticas() {
        return await this.adminService.getEstadisticas();
    }

    @Get('restaurantes')
    async getRestaurantes() {
        return await this.restaurantsService.findAll(); // ahora sí funcionará
    }

}
