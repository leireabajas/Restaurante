import {
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserva, ReservaDocument } from '../../schemas/reservation.schema';
import { Restaurante, RestauranteDocument } from '../../schemas/restaurant.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Types } from 'mongoose';


@Injectable()
export class ReservationsService {
    constructor(
        @InjectModel(Reserva.name) private reservationModel: Model<ReservaDocument>,
        @InjectModel(Restaurante.name) private restaurantModel: Model<RestauranteDocument>
    ) {}

    async findAll(): Promise<Reserva[]> {
        return this.reservationModel.find().populate('restaurante').exec();
    }

    async findOne(id: string): Promise<Reserva> {
        const reserva = await this.reservationModel.findById(id).populate('restaurante');
        if (!reserva) throw new NotFoundException('Reserva no encontrada');
        return reserva;
    }

    async create(dto: CreateReservationDto, userId: string): Promise<Reserva> {
        const restaurante = await this.restaurantModel.findById(dto.restaurante);
        if (!restaurante) throw new NotFoundException('Restaurante no encontrado');

        const [inicio, fin] = restaurante.horario.split(' - ');
        if (dto.hora < inicio || dto.hora > fin) {
            throw new BadRequestException(`Hora fuera de horario: ${inicio} - ${fin}`);
        }

        const nuevaReserva = new this.reservationModel({
            ...dto,
            usuario: new Types.ObjectId(userId),
            restaurante: new Types.ObjectId(dto.restaurante),
            nombreCliente: dto.nombreCliente // ✅ Importante añadir
        });

        return nuevaReserva.save();
    }


    async update(id: string, dto: UpdateReservationDto, userId: string): Promise<Reserva> {
        const reserva = await this.reservationModel.findById(id).populate('restaurante');
        if (!reserva) throw new NotFoundException('Reserva no encontrada');

        const restaurante = await this.restaurantModel.findById(reserva.restaurante._id);

        const esCliente = reserva.usuario.toString() === userId;
        const esPropietario = restaurante?.propietario.toString() === userId;

        // ⚠️ Solo el cliente puede editar datos, el propietario solo estado
        if (!esCliente && !esPropietario) {
            throw new UnauthorizedException('No tienes permiso para modificar esta reserva');
        }

        // Si es propietario, solo puede cambiar el estado
        if (esPropietario) {
            if (!dto.estado) {
                throw new BadRequestException('Solo puedes cambiar el estado de la reserva');
            }
            reserva.estado = dto.estado;
        }

        // Si es el cliente, puede editar los campos normales
        if (esCliente) {
            Object.assign(reserva, dto);
            reserva.estado = 'pendiente';
        }

        return reserva.save();
    }


    async delete(id: string, userId: string): Promise<void> {
        const reserva = await this.reservationModel.findById(id);
        if (!reserva) throw new NotFoundException('Reserva no encontrada');

        if (reserva.usuario.toString() !== userId) {
            throw new UnauthorizedException('No tienes permiso para borrar esta reserva');
        }

        await this.reservationModel.findByIdAndDelete(id);
    }


    async findByUser(userId: string): Promise<Reserva[]> {
        return this.reservationModel.find({
            usuario: new Types.ObjectId(userId),
            estado: { $ne: 'cancelada' }
        })
            .populate('restaurante')
            .exec();
    }



    async obtenerPorPropietario(propietarioId: string): Promise<Reserva[]> {
        try {
            const propId = new Types.ObjectId(propietarioId);
            const restaurantes = await this.restaurantModel.find({ propietario: propId }).exec();

            console.log('🧪 Restaurantes encontrados para el propietario', propietarioId, restaurantes);

            const idsRestaurantes = restaurantes.map(r => r._id);

            const reservas = await this.reservationModel
                .find({ restaurante: { $in: idsRestaurantes } })
                .populate('restaurante')
                .populate('usuario')
                .exec();

            console.log('📋 Reservas encontradas:', reservas);

            return reservas;
        } catch (error) {
            console.error('❌ Error en obtenerPorPropietario:', error);
            throw new InternalServerErrorException('Error interno al cargar reservas del propietario');
        }
    }

}

