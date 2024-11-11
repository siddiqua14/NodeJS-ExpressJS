import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateHotelDto, Hotel } from '../types/hotel.types';

const DATA_DIR = 'data';
const DATA_FILE = 'hotels.json';
const DATA_FILE_PATH = path.join(__dirname, '..', DATA_DIR, DATA_FILE);

export class HotelModel {
    private static async ensureDataFile() {
        try {
            await fs.access(DATA_FILE_PATH);
        } catch {
            await fs.mkdir(path.join(__dirname, '..', DATA_DIR), { recursive: true });
            await fs.writeFile(DATA_FILE_PATH, JSON.stringify([]));
        }
    }

    private static async readDataFile(): Promise<Hotel[]> {
        await this.ensureDataFile();
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(data || '[]');
    }

    private static async writeDataFile(data: Hotel[]): Promise<void> {
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
    }

    public static async createHotel(hotelData: CreateHotelDto): Promise<Hotel> {
        const hotels = await this.readDataFile();
        const newHotel: Hotel = {
            id: uuidv4(),
            ...hotelData,
            rooms: hotelData.rooms.map(room => ({
                ...room,
                id: uuidv4()
            })),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        hotels.push(newHotel);
        await this.writeDataFile(hotels);
        return newHotel;
    }

    public static async getHotelById(id: string): Promise<Hotel | null> {
        const hotels = await this.readDataFile();
        return hotels.find(hotel => hotel.id === id) || null;
    }

    public static async updateHotel(id: string, updateData: Partial<CreateHotelDto>): Promise<Hotel | null> {
        const hotels = await this.readDataFile();
        const hotelIndex = hotels.findIndex(hotel => hotel.id === id);
        if (hotelIndex === -1) return null;

        const existingHotel = hotels[hotelIndex];
        const updatedHotel: Hotel = {
            ...existingHotel,
            ...updateData,
            rooms: updateData.rooms ? updateData.rooms.map(room => ({
                ...room,
                id: room.id || uuidv4()
            })) : existingHotel.rooms,
            updatedAt: new Date().toISOString()
        };

        hotels[hotelIndex] = updatedHotel;
        await this.writeDataFile(hotels);
        return updatedHotel;
    }
}