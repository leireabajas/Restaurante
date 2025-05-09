import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservaDocument = HydratedDocument<Reserva>;

@Schema({ collection: 'reservas' })
export class Reserva {
    @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
    usuario: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Restaurante', required: true })
    restaurante: Types.ObjectId;

    @Prop({ required: true })
    fecha: string;

    @Prop({ required: true })
    hora: string;

    @Prop({ required: true, min: 1 })
    numeroPersonas: number;

    @Prop({ type: String, required: true })
    nombreCliente: string;


    @Prop({
        default: 'pendiente',
        enum: ['pendiente', 'confirmada', 'cancelada']
    })
    estado: 'pendiente' | 'confirmada' | 'cancelada';
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);
