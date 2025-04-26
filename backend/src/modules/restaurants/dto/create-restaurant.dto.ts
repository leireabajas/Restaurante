export interface CreateRestaurantDto {
    nombre: string;
    ubicacion: string;
    tipoComida: string;
    capacidad: number;
    opiniones?: string[];
}
