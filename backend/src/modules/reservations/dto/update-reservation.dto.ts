export interface UpdateReservationDto {
    restaurante?: string;
    usuario?: string;
    fecha?: Date;
    numeroPersonas?: number;
    estado?: 'pendiente' | 'confirmada' | 'cancelada';
}
