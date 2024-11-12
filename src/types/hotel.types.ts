// types/hotel.types.ts
export interface Room {
    id?: string;  // Optional for creation
    title: string;
    bedCount: number;
}

export interface Hotel {
    id: string;
    simpleId: number; 
    slug: string;
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
    images?: string[]; // New optional field for image paths
    createdAt: string;
    updatedAt: string;
}

// src/types/hotel.types.ts
export type CreateHotelDto = Omit<Hotel, 'id' | 'simpleId' | 'slug' | 'createdAt' | 'updatedAt'>;

