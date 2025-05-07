import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
    UseGuards,
    Request
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import {Roles} from "../../common/roles.decorator";
import {RolesGuard} from "../../common/roles.guard";

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}


    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserReservations(@Request() req) {
        const userId = req.user.userId;
        return await this.reservationsService.findByUser(userId);
    }


    // ✅ Pública: obtener por ID (opcional)
    @Get(':id')
    async getReservationById(@Param('id') id: string) {
        const reservation = await this.reservationsService.findOne(id);
        if (!reservation) throw new NotFoundException('Reserva no encontrada');
        return reservation;
    }

    // 🔐 Crear reserva → solo logueados
    @UseGuards(JwtAuthGuard)
    @Post()
    async createReservation(
        @Body() createReservationDto: CreateReservationDto,
        @Request() req
    ) {
        const userId = req.user.userId;
        return await this.reservationsService.create(createReservationDto, userId);
    }

    // 🔐 Editar reserva → solo logueados
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateReservation(
        @Param('id') id: string,
        @Body() updateReservationDto: UpdateReservationDto,
        @Request() req
    ) {
        const userId = req.user.userId;
        return await this.reservationsService.update(id, updateReservationDto, userId);
    }

    // 🔐 Eliminar reserva → solo logueados
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteReservation(@Param('id') id: string, @Request() req) {
        const userId = req.user.userId;
        return await this.reservationsService.delete(id, userId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('propietario')
    @Get('mis')
    async obtenerMisReservas(@Request() req) {
        const propietarioId = req.user.userId; // viene del token
        return await this.reservationsService.obtenerPorPropietario(propietarioId);
    }
}
