// src/models/hotel.model.ts
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateHotelDto, Hotel } from '../types/hotel.types';

const dataFilePath = path.join(__dirname, '../../data/hotels.json');

export class HotelModel {
    static async readDataFile(): Promise<Hotel[]> {
        if (!fs.existsSync(dataFilePath)) {
            await fs.promises.writeFile(dataFilePath, JSON.stringify([]));
        }
        const data = await fs.promises.readFile(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }

    static async writeDataFile(data: Hotel[]) {
        await fs.promises.writeFile(dataFilePath, JSON.stringify(data, null, 2));
    }

    static async createHotel(hotelData: CreateHotelDto): Promise<Hotel> {
        const hotels = await this.readDataFile();
        const newHotel = { id: uuidv4(), ...hotelData, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        hotels.push(newHotel);
        await this.writeDataFile(hotels);
        return newHotel;
    }

    static async getHotelById(id: string): Promise<Hotel | undefined> {
        const hotels = await this.readDataFile();
        return hotels.find(hotel => hotel.id === id);
    }

    static async updateHotel(id: string, updateData: Partial<CreateHotelDto>): Promise<Hotel | null> {
        const hotels = await this.readDataFile();
        const hotelIndex = hotels.findIndex(hotel => hotel.id === id);

        if (hotelIndex === -1) return null;

        const updatedHotel = { ...hotels[hotelIndex], ...updateData, updatedAt: new Date().toISOString() };
        hotels[hotelIndex] = updatedHotel;
        await this.writeDataFile(hotels);

        return updatedHotel;
    }
}
