// controllers/hotel.controller.ts
import { Request, Response } from 'express';
import { HotelModel } from '../models/hotel.model';
import { CreateHotelDto } from '../types/hotel.types';

export class HotelController {
    static async createHotel(req: Request, res: Response) {
        try {
            const hotelData: CreateHotelDto = req.body;

            // Validation
            if (!hotelData.title?.trim()) {
                return res.status(400).json({
                    success: false,
                    error: 'Title is required'
                });
            }

            if (!hotelData.description?.trim()) {
                return res.status(400).json({
                    success: false,
                    error: 'Description is required'
                });
            }

            const newHotel = await HotelModel.createHotel(hotelData);
            
            return res.status(201).json({
                success: true,
                data: newHotel
            });
        } catch (error: any) {
            console.error('Create hotel error:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to create hotel',
                message: error.message
            });
        }
    }

    static async getHotel(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id?.trim()) {
                return res.status(400).json({
                    success: false,
                    error: 'Hotel ID is required'
                });
            }

            const hotel = await HotelModel.getHotelById(id);

            if (!hotel) {
                return res.status(404).json({
                    success: false,
                    error: 'Hotel not found'
                });
            }

            return res.json({
                success: true,
                data: hotel
            });
        } catch (error: any) {
            console.error('Get hotel error:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to get hotel',
                message: error.message
            });
        }
    }

    static async updateHotel(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (!id?.trim()) {
                return res.status(400).json({
                    success: false,
                    error: 'Hotel ID is required'
                });
            }

            const hotel = await HotelModel.updateHotel(id, updateData);

            if (!hotel) {
                return res.status(404).json({
                    success: false,
                    error: 'Hotel not found'
                });
            }

            return res.json({
                success: true,
                data: hotel
            });
        } catch (error: any) {
            console.error('Update hotel error:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to update hotel',
                message: error.message
            });
        }
    }
}
