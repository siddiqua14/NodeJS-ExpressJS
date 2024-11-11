"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/hotel.routes.ts
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const hotel_controller_1 = require("../controllers/hotel.controller");
const router = (0, express_1.Router)();
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    }
});
// Configure file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'));
    }
};
// Configure multer
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});
// Create handlers that match Express's RequestHandler type
const createHotelHandler = (req, res, next) => {
    hotel_controller_1.HotelController.createHotel(req, res).catch(next);
};
const getHotelHandler = (req, res, next) => {
    hotel_controller_1.HotelController.getHotel(req, res).catch(next);
};
const updateHotelHandler = (req, res, next) => {
    hotel_controller_1.HotelController.updateHotel(req, res).catch(next);
};
const uploadImagesHandler = (req, res, next) => {
    hotel_controller_1.HotelController.uploadImages(req, res).catch(next);
};
// Define routes with proper typing
router.post('/hotel', createHotelHandler);
router.get('/hotel/:id', getHotelHandler);
router.put('/hotel/:id', updateHotelHandler);
router.post('/hotel/:id/images', upload.array('images', 10), uploadImagesHandler);
exports.default = router;
