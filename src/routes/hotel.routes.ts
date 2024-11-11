// src/routes/hotel.routes.ts
import { Router, Request, Response } from 'express';
import { HotelController } from '../controllers/hotel.controller';

const router = Router();

router.post('/hotel', async (req: Request, res: Response) => {
    await HotelController.createHotel(req, res);
});

router.get('/hotel/:id', async (req: Request, res: Response) => {
    await HotelController.getHotel(req, res);
});

router.put('/hotel/:id', async (req: Request, res: Response) => {
    await HotelController.updateHotel(req, res);
});

export default router;
