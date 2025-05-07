import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;

    @IsString()
    @IsNotEmpty()
    ubicacion: string;

    @IsString()
    @IsNotEmpty()
    tipoComida: string;

    @IsNumber()
    capacidad: number;

    @IsString()
    @IsNotEmpty()
    horario: string;

    @IsString()
    descripcion?: string;

    @IsString()
    imagen?: string;
}
