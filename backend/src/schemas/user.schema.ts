import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema({ timestamps: true } )
export class Usuario {
    _id?: Types.ObjectId;

    @Prop({ required: true, unique: true })
    username: string;            // nombre de usuario

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phone?: string;              // teléfono opcional

    @Prop({
        required: true,
        default: 'cliente',
        enum: ['cliente', 'propietario', 'admin']
    })
    role: 'cliente' | 'propietario' | 'admin';
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
