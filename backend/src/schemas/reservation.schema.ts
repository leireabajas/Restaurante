import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservaDocument = HydratedDocument<Reserva>;

@Schema({ collection: 'reservas' })
export class Reserva {
    @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
    usuario: Types.ObjectId; // el cliente que hace la reserva

    @Prop({ type: Types.ObjectId, ref: 'Restaurante', required: true })
    restaurante: Types.ObjectId;

    @Prop({ required: true })
    fecha: string; // formato 'YYYY-MM-DD'

    @Prop({ required: true })
    hora: string; // formato 'HH:mm'

    @Prop({ required: true, min: 1 })
    numeroPersonas: number;
}

export const ReservaSchema = SchemaFactory.createForClass(Reserva);
