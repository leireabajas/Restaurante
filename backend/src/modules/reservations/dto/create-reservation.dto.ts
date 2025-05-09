import { IsString, IsNotEmpty, IsDateString, IsInt, Min } from 'class-validator';

export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
    restaurante: string; // ID del restaurante

    @IsDateString()
    @IsNotEmpty()
    fecha: string; // formato ISO: '2025-05-06'

    @IsString()
    @IsNotEmpty()
    hora: string; // formato simple: '20:00'

    @IsInt()
    @Min(1)
    numeroPersonas: number;

    @IsString()
    @IsNotEmpty()
    nombreCliente: string;
}
