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
import { Roles } from '../../common/roles.decorator';
import { RolesGuard } from '../../common/roles.guard';

@Controller('reservations')
export class ReservationsController {
    constructor(private readonly reservationsService: ReservationsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserReservations(@Request() req) {
        const userId = req.user.userId;
        return await this.reservationsService.findByUser(userId);
    }

    // 🔐 Reservas para propietarios → MOVER AQUÍ
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('propietario')
    @Get('mis')
    async getByOwner(@Request() req) {
        const propietarioId = req.user.userId;
        return await this.reservationsService.obtenerPorPropietario(propietarioId);
    }

    @Get(':id')
    async getReservationById(@Param('id') id: string) {
        const reservation = await this.reservationsService.findOne(id);
        if (!reservation) throw new NotFoundException('Reserva no encontrada');
        return reservation;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createReservation(@Body() dto: CreateReservationDto, @Request() req) {
        const userId = req.user.userId;
        return await this.reservationsService.create(dto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateReservation(@Param('id') id: string, @Body() dto: UpdateReservationDto, @Request() req) {
        const userId = req.user.userId;
        return await this.reservationsService.update(id, dto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteReservation(@Param('id') id: string, @Request() req) {
        console.log('🔒 DELETE desde usuario:', req.user);
        const userId = req.user.userId;
        return await this.reservationsService.delete(id, userId);
    }

}