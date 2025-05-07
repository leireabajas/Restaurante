import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateRestaurantDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    direccion?: string;

    @IsString()
    @IsOptional()
    ubicacion?: string;

    @IsString()
    @IsOptional()
    tipoComida?: string;

    @IsNumber()
    @IsOptional()
    capacidad?: number;

    @IsString()
    @IsOptional()
    horario?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsString()
    @IsOptional()
    imagen?: string;
}
