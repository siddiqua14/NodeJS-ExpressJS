// types/hotel.types.ts
export interface Room {
    id?: string;  // Optional for creation
    title: string;
    bedCount: number;
}

export interface Hotel {
    id: string;
    title: string;
    description: string;
    capacity: {
        guests: number;
        bedrooms: number;
        bathrooms: number;
    };
    location: {
        address: string;
        latitude: number;
        longitude: number;
    };
    host: {
        name: string;
        email: string;
        phone: string;
    };
    amenities: string[];
    rooms: Room[];
    createdAt: string;
    updatedAt: string;
}

export type CreateHotelDto = Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>;
