import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserva, ReservaDocument } from '../../schemas/reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
    constructor(@InjectModel(Reserva.name) private reservationModel: Model<ReservaDocument>) {}

    async findAll(): Promise<Reserva[]> {
        return this.reservationModel.find().populate('restaurante');
    }

    async findOne(id: string): Promise<Reserva> {
        const reservation = await this.reservationModel.findById(id).populate('restaurante');
        if (!reservation) throw new NotFoundException('Reserva no encontrada');
        return reservation;
    }


    async create(createReservationDto: CreateReservationDto, userId: string): Promise<Reserva> {
        const data = {
            ...createReservationDto,
            usuario: userId
        };
        const newReservation = new this.reservationModel(data);
        return newReservation.save();
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
}
