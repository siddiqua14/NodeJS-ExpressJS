import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const hotelId = req.params.id;
        const roomSlug = req.params.roomSlug;

        // Make sure hotel ID and room slug are available
        if (!hotelId || !roomSlug) {
            return cb(new Error('Hotel ID and Room Slug are required'), '');
        }

        // Directory for room images
        const destinationPath = path.join(__dirname, `../uploads/rooms/${hotelId}/${roomSlug}`);

        // Ensure the directory exists
        fs.mkdirSync(destinationPath, { recursive: true });

        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const hotelId = req.params.id;
        const roomSlug = req.params.roomSlug;
        const extension = path.extname(file.originalname);
        const filename = `${hotelId}-${roomSlug}-${Date.now()}${extension}`;
        cb(null, filename);
    }
});

// Multer instance for image upload
export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
});
