import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
    InternalServerErrorException,
    UseGuards,
    Request
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/roles.decorator';
import { Query } from '@nestjs/common';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    // ✅ Público
    @Get()
    async findAll(@Request() req, @Query('propietario') propietarioId?: string) {
        try {
            const restaurantes = propietarioId
                ? await this.restaurantsService.findByPropietario(propietarioId)
                : await this.restaurantsService.findAll();

            return {
                status: 'Ok',
                results: restaurantes.length,
                data: restaurantes
            };
        } catch {
            throw new InternalServerErrorException({
                status: 'Error',
                message: 'Error interno del servidor'
            });
        }
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('propietario')
    @Get('mis')
    async getMisRestaurantes(@Request() req) {
        const propietarioId = req.user.userId;
        console.log('📢 Propietario ID:', propietarioId); // ← esto viene del JWT
        const restaurantes = await this.restaurantsService.findByPropietario(propietarioId);
        return {
            status: 'Ok',
            results: restaurantes.length,
            data: restaurantes
        };
    }

    // ✅ Público
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const restaurante = await this.restaurantsService.findOne(id);
            if (!restaurante) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Restaurante no encontrado'
                });
            }
            return { status: 'Ok', data: restaurante };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException({
                status: 'Error',
                message: 'Error interno del servidor'
            });
        }
    }

    // 🔐 Solo propietarios autenticados
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('propietario','admin')
    @Post()
    async create(
        @Body() createRestaurantDto: CreateRestaurantDto,
        @Request() req
    ) {
        try {
            const propietarioId = req.user.userId;
            const nuevoRestaurante = await this.restaurantsService.create(
                createRestaurantDto,
                propietarioId
            );
            return {
                status: 'Ok',
                message: 'Restaurante creado',
                data: nuevoRestaurante
            };
        } catch {
            throw new InternalServerErrorException({
                status: 'Error',
                message: 'No se pudo crear el restaurante'
            });
        }
    }

    // 🔐 Solo propietarios autenticados
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('propietario','admin')
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateRestaurantDto: UpdateRestaurantDto
    ) {
        try {
            const restauranteActualizado = await this.restaurantsService.update(
                id,
                updateRestaurantDto
            );
            if (!restauranteActualizado) {
                throw new NotFoundException({
                    status: 'Error',
                    message: 'Restaurante no encontrado'
                });
            }
            return {
                status: 'Ok',
                message: 'Restaurante actualizado',
                data: restauranteActualizado
            };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException({
                status: 'Error',
                message: 'Error interno del servidor'
            });
        }
    }

    // 🔐 Solo propietarios autenticados
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('propietario','admin')
    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            await this.restaurantsService.delete(id);
            return { status: 'Ok', message: 'Restaurante eliminado' };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException({
                status: 'Error',
                message: 'Error interno del servidor'
            });
        }
    }


}
