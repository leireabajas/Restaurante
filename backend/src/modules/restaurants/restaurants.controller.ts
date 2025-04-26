import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    NotFoundException,
    InternalServerErrorException,
    UseGuards
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';


//@UseGuards(JwtAuthGuard)
@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Get()
    async findAll() {
        try {
            const restaurantes = await this.restaurantsService.findAll();
            return {
                status: 'Ok',
                results: restaurantes.length,
                data: restaurantes
            };
        } catch (error) {
            throw new InternalServerErrorException({
                status: 'Error',
                message: 'Error interno del servidor'
            });
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const restaurante = await this.restaurantsService.findOne(id);
            if (!restaurante) throw new NotFoundException({ status: 'Error', message: 'Restaurante no encontrado' });
            return { status: 'Ok', data: restaurante };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException({ status: 'Error', message: 'Error interno del servidor' });
        }
    }

    @Post()
    async create(@Body() createRestaurantDto: CreateRestaurantDto) {
        try {
            const nuevoRestaurante = await this.restaurantsService.create(createRestaurantDto);
            return { status: 'Ok', message: 'Restaurante creado', data: nuevoRestaurante };
        } catch (error) {
            throw new InternalServerErrorException({ status: 'Error', message: 'No se pudo crear el restaurante' });
        }
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        try {
            const restauranteActualizado = await this.restaurantsService.update(id, updateRestaurantDto);
            if (!restauranteActualizado) throw new NotFoundException({ status: 'Error', message: 'Restaurante no encontrado' });
            return { status: 'Ok', message: 'Restaurante actualizado', data: restauranteActualizado };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException({ status: 'Error', message: 'Error interno del servidor' });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            await this.restaurantsService.delete(id);
            return { status: 'Ok', message: 'Restaurante eliminado' };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException({ status: 'Error', message: 'Error interno del servidor' });
        }
    }

}
