// src/routes/hotel.routes.ts
import { Router, Request, Response } from 'express';
import { HotelController} from '../controllers/hotel.controller';
import multer from 'multer';

// Configure storage for uploaded files (save to a local folder 'uploads')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Save to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Generate a unique file name
    }
});

// Set file size limit (optional)
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });  // Limit to 5MB

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
// New route for uploading images
router.post('/hotel/:id/images', upload.array('images', 5), async (req: Request, res: Response) => {
    await HotelController.uploadImages(req, res);
});

export default router;
