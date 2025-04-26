import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Restaurante } from './restaurant.schema';

export type ReservaDocument = HydratedDocument<Reserva>;

@Schema()
export class Reserva {
    @Prop({ type: Types.ObjectId, ref: Restaurante.name, required: true })
    restaurante: Types.ObjectId;

    @Prop({ required: true })
    usuario: string;

    @Prop({ required: true })
    fecha: Date;

    @Prop({ required: true })
    numeroPersonas: number;

    @Prop({ default: 'pendiente', enum: ['pendiente', 'confirmada', 'cancelada'] })
    estado: string;
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);
