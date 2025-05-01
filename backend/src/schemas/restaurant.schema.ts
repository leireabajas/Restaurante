import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RestauranteDocument = HydratedDocument<Restaurante>;

@Schema({ collection: 'misRestaurantes' })
export class Restaurante {
    @Prop({ required: true })
    nombre: string;

    @Prop({ required: true })
    ubicacion: string;

    @Prop({ required: true })
    tipoComida: string;

    @Prop({ required: true })
    capacidad: number;

    @Prop({ default: [] })
    opiniones: string[];

    @Prop({ required: false })
    imagen?: string;

    @Prop({ required: false })
    descripcion?: string;

}

export const RestauranteSchema = SchemaFactory.createForClass(Restaurante);
