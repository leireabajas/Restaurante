import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
    _id?: Types.ObjectId;

    @Prop({ required: true, unique: true })
    username: string;          // ← nuevo

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phone?: string;            // ← nuevo, opcional

    @Prop({ default: 'usuario', enum: ['usuario', 'admin'] })
    role: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
