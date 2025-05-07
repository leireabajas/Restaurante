import { IsString, IsOptional, IsDateString, IsInt, Min } from 'class-validator';

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
}
