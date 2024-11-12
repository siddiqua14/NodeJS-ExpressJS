// src/controllers/hotel.controller.ts
import { Request, Response } from 'express';
import { HotelModel } from '../models/hotel.model';
import { CreateHotelDto } from '../types/hotel.types';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

// Setup multer for handling image uploads
const upload = multer({
    dest: path.join(__dirname, '../../uploads'),  // Directory for storing images
    limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
});

export class HotelController {
    static async createHotel(req: Request, res: Response) {
        try {
            const hotelData: CreateHotelDto = req.body;
            const newHotel = await HotelModel.createHotel(hotelData);
            res.status(201).json({ message: 'Hotel created successfully', data: newHotel });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create hotel' });
        }
    }

    // Retrieve a hotel by ID or slug
    static async getHotel(req: Request, res: Response) {
        try {
            const { id } = req.params;
            // Check if the id is a valid UUID
            const hotel = await HotelModel.getHotelById(id) || await HotelModel.getHotelBySimpleId(Number(id)) || await HotelModel.getHotelBySlug(id); // Check ID, SimpleId, and Slug

            // If hotel not found by ID, try to fetch by slug
            if (!hotel) {
                return res.status(404).json({ error: 'Hotel not found' });
            }
    
            res.json({ message: 'Hotel retrieved successfully', data: hotel });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get hotel' });
        }
    }
    // Update a hotel
    static async updateHotel(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const hotel = await HotelModel.updateHotel(id, updateData);
            if (!hotel) {
                return res.status(404).json({ error: 'Hotel not found' });
            }

            res.json({ message: 'Hotel updated successfully', data: hotel });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update hotel' });
        }
    }
    // Upload multiple images for a hotel
    static async uploadImages(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const files = req.files as Express.Multer.File[];

            if (!files || files.length === 0) {
                return res.status(400).json({ error: 'No files uploaded' });
            }

            // Extract image URLs
            const imageUrls = files.map(file => `http://localhost:5050/uploads/${file.filename}`);

            // Retrieve the hotel by ID
            const hotel = await HotelModel.getHotelById(id);
            if (!hotel) {
                return res.status(404).json({ error: 'Hotel not found' });
            }

            // Add the image URLs to the hotel data
            hotel.images = [...(hotel.images || []), ...imageUrls];
            await HotelModel.updateHotel(id, hotel);

            res.json({ message: 'Images uploaded successfully', data: hotel });
        } catch (error) {
            res.status(500).json({ error: 'Failed to upload images' });
        }
    }
    // Commented out for now as per requirements
    // static async uploadImages(req: Request, res: Response) {
    // }
}
//export { upload };
