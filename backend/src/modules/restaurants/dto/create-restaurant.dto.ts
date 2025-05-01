export interface CreateRestaurantDto {
    nombre: string;
    ubicacion: string;
    tipoComida: string;
    capacidad: number;
    imagen?: string;
    descripcion?: string;
}