import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RestauranteDocument = HydratedDocument<Restaurante>;

@Schema({ collection: 'misRestaurantes' })
export class Restaurante {
    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    direccion: string;

    @Prop({ required: true })
    ubicacion: string;

    @Prop({ required: true })
    tipoComida: string;

    @Prop({ required: true })
    capacidad: number;

    @Prop({ required: true })
    horario: string;

    @Prop()
    imagen?: string;

    @Prop()
    descripcion?: string;

    @Prop()
    lat: number;

    @Prop()
    lng: number;


    @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
    propietario: Types.ObjectId;
}

export const RestauranteSchema = SchemaFactory.createForClass(Restaurante);
