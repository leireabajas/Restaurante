import {IsString, IsOptional, IsDateString, IsInt, Min, IsIn} from 'class-validator';

export class UpdateReservationDto {
    @IsString()
    @IsOptional()
    restaurante?: string;

    @IsDateString()
    @IsOptional()
    fecha?: string;

    @IsString()
    @IsOptional()
    hora?: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    numeroPersonas?: number;

    @IsOptional()
    @IsString()
    @IsIn(['pendiente', 'confirmada', 'cancelada'])
    estado?: 'pendiente' | 'confirmada' | 'cancelada';
}
