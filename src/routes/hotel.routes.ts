import express, { Router, Request, Response } from 'express';
import { HotelController } from '../controllers/hotel.controller';

const router = Router();

router.post('/hotels', async (req: Request, res: Response) => {
    await HotelController.createHotel(req, res);
});

router.get('/hotels/:id', async (req: Request, res: Response) => {
    await HotelController.getHotel(req, res);
});

router.put('/hotels/:id', async (req: Request, res: Response) => {
    await HotelController.updateHotel(req, res);
});

export default router;