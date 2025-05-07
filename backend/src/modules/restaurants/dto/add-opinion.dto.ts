// src/modules/restaurants/dto/add-opinion.dto.ts
import { IsNotEmpty, IsInt, Min, Max, IsString } from 'class-validator';

export class AddOpinionDto {
    @IsString()
    @IsNotEmpty()
    comentario: string;

    @IsInt()
    @Min(1)
    @Max(5)
    puntuacion: number;
}
