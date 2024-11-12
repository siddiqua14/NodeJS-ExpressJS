import { Router } from 'express';
import { createHotel, getHotelByIdOrSlug, updateHotelById, uploadImages } from '../controllers/hotel.controller';
import { upload } from '../middleware/hotel.middleware';
import { uploadRoomImages } from '../controllers/hotel.controller'; // Correct import

const router = Router();
router.post('/hotel', createHotel);
router.get('/hotel/:idOrSlug', getHotelByIdOrSlug);
router.put('/hotel/:id', updateHotelById);
router.post('/images/:id', upload.array('images', 10), uploadImages);
// Route for uploading images to a specific room using hotelId and roomSlug
//router.post('/room/images/:id/:roomSlug', upload.array('images', 10), uploadRoomImages);

export default router;
