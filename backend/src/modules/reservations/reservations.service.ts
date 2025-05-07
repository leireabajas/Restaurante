import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserva, ReservaDocument } from '../../schemas/reservation.schema';
import { Restaurante, RestauranteDocument } from '../../schemas/restaurant.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
    constructor(
        @InjectModel(Reserva.name) private reservationModel: Model<ReservaDocument>,
        @InjectModel(Restaurante.name) private restaurantModel: Model<RestauranteDocument>
    ) {}

    async findAll(): Promise<Reserva[]> {
        return this.reservationModel
            .find()
            .populate('restaurante')  // importante para mostrar nombre del restaurante
            .exec();
    }

    async findOne(id: string): Promise<Reserva> {
        const reservation = await this.reservationModel.findById(id).populate('restaurante');
        if (!reservation) throw new NotFoundException('Reserva no encontrada');
        return reservation;
    }

    async create(createReservationDto: CreateReservationDto, userId: string): Promise<Reserva> {
        const restaurante = await this.restaurantModel.findById(createReservationDto.restaurante);
        if (!restaurante) {
            throw new NotFoundException('Restaurante no encontrado');
        }

        const [horaApertura, horaCierre] = restaurante.horario.split(' - ');
        const horaReserva = createReservationDto.hora;

        if (horaReserva < horaApertura || horaReserva > horaCierre) {
            throw new BadRequestException(`La hora de la reserva debe estar entre ${horaApertura} y ${horaCierre}`);
        }

        const nuevaReserva = new this.reservationModel({
            ...createReservationDto,
            usuario: userId
        });
        return nuevaReserva.save();
    }

    async update(id: string, updateReservationDto: UpdateReservationDto, userId: any): Promise<Reserva> {
        const updatedReservation = await this.reservationModel.findByIdAndUpdate(id, updateReservationDto, { new: true });
        if (!updatedReservation) throw new NotFoundException('Reserva no encontrada');
        return updatedReservation;
    }

    async delete(id: string, userId: any): Promise<void> {
        const reserva = await this.reservationModel.findById(id);
        if (!reserva) throw new NotFoundException('Reserva no encontrada');

        await this.reservationModel.findByIdAndDelete(id).exec();
    }

    async obtenerPorPropietario(propietarioId: string): Promise<Reserva[]> {
        const restaurantes = await this.restaurantModel.find({ propietario: propietarioId }).exec();
        const idsRestaurantes = restaurantes.map(r => r._id);

        return this.reservationModel
            .find({ restaurante: { $in: idsRestaurantes } })
            .populate('restaurante')
            .exec();
    }

    async findByUser(userId: string): Promise<Reserva[]> {
        return this.reservationModel
            .find({ usuario: userId })
            .populate('restaurante')
            .exec();
    }

}
