// src/models/hotel.model.ts
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import slugify from 'slugify';

import { CreateHotelDto, Hotel } from '../types/hotel.types';

const dataFilePath = path.join(__dirname, '../../data/hotels.json');
const uploadsDirectory = path.join(__dirname, '../../uploads/');

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
        const newHotel = {
            id: uuidv4(), // Unique ID
            simpleId: hotels.length + 101, // Generate a simple ID starting from 101
            slug: slugify(hotelData.title, { lower: true }), // Generate slug from title
            ...hotelData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        hotels.push(newHotel);
        await this.writeDataFile(hotels);
        return newHotel;
    }

    static async getHotelById(id: string): Promise<Hotel | undefined> {
        const hotels = await this.readDataFile();
        return hotels.find(hotel => hotel.id === id);
    }

    static async getHotelBySimpleId(simpleId: number): Promise<Hotel | undefined> {
        const hotels = await this.readDataFile();
        return hotels.find(hotel => hotel.simpleId === simpleId);
    }
    static async getHotelBySlug(slug: string): Promise<Hotel | undefined> {
        const hotels = await this.readDataFile();
        return hotels.find(hotel => hotel.slug === slug); // Find hotel by slug
    }
    static async updateHotel(id: string, updateData: Partial<CreateHotelDto>): Promise<Hotel | null> {
        const hotels = await this.readDataFile();
        console.log('Current Hotels:', hotels);  // Add this log to check the data
    
        const hotelIndex = hotels.findIndex(hotel => hotel.id === id);
        if (hotelIndex === -1) return null;
    
        const updatedHotel = { ...hotels[hotelIndex], ...updateData, updatedAt: new Date().toISOString() };
        hotels[hotelIndex] = updatedHotel;
        await this.writeDataFile(hotels);
    
        return updatedHotel;
    }
    static async addHotelImages(id: string, imagePaths: string[]): Promise<Hotel | null> {
        const hotels = await this.readDataFile();
        const hotelIndex = hotels.findIndex(hotel => hotel.id === id);

        if (hotelIndex === -1) return null;

        const hotel = hotels[hotelIndex];
        hotel.images = hotel.images ? [...hotel.images, ...imagePaths] : imagePaths;
        hotels[hotelIndex] = hotel;

        await this.writeDataFile(hotels);
        return hotel;
    }
}
