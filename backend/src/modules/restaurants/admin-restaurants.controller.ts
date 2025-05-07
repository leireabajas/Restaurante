import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Request,
    UseGuards,
    NotFoundException
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('propietario')
@Controller('admin/restaurants')
export class AdminRestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Get()
    async findAll() {
        return this.restaurantsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const restaurante = await this.restaurantsService.findOne(id);
        if (!restaurante) throw new NotFoundException('Restaurante no encontrado');
        return restaurante;
    }

    @Post()
    async create(@Body() dto: CreateRestaurantDto, @Request() req) {
        const propietarioId = req.user.userId;
        return this.restaurantsService.create(dto, propietarioId);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateRestaurantDto) {
        return this.restaurantsService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.restaurantsService.delete(id);
        return { status: 'Ok', message: 'Restaurante eliminado' };
    }
}
