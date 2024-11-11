// src/controllers/hotel.controller.ts
import { Request, Response } from 'express';
import { HotelModel } from '../models/hotel.model';
import { CreateHotelDto } from '../types/hotel.types';

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

    static async getHotel(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const hotel = await HotelModel.getHotelById(id);

            if (!hotel) {
                return res.status(404).json({ error: 'Hotel not found' });
            }

            res.json({ message: 'Hotel retrieved successfully', data: hotel });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get hotel' });
        }
    }

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

    // Commented out for now as per requirements
    // static async uploadImages(req: Request, res: Response) {
    // }
}
