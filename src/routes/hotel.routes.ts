import { Router } from 'express';
import { createHotel, getHotelByIdOrSlug, updateHotelById, uploadImages } from '../controllers/hotel.controller';
import { upload } from '../middleware/hotel.middleware';

const router = Router();
router.post('/hotel', createHotel);
router.get('/hotel/:idOrSlug', getHotelByIdOrSlug);
router.put('/hotel/:id', updateHotelById);
router.post('/images/:id', upload.array('images', 10), uploadImages);

export default router;
