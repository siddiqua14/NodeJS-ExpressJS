"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelController = void 0;
const hotel_model_1 = require("../models/hotel.model");
class HotelController {
    static createHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hotelData = req.body;
                // Basic validation
                if (!hotelData.title || !hotelData.location || !hotelData.host) {
                    res.status(400).json({
                        success: false,
                        error: 'Missing required fields'
                    });
                    return;
                }
                const newHotel = yield hotel_model_1.HotelModel.createHotel(hotelData);
                res.status(201).json({
                    success: true,
                    message: 'Hotel created successfully',
                    data: newHotel
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message || 'Failed to create hotel'
                });
            }
        });
    }
    static getHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const hotel = yield hotel_model_1.HotelModel.getHotelById(id);
                if (!hotel) {
                    res.status(404).json({
                        success: false,
                        error: 'Hotel not found'
                    });
                    return;
                }
                res.json({
                    success: true,
                    message: 'Hotel retrieved successfully',
                    data: hotel
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message || 'Failed to get hotel'
                });
            }
        });
    }
    static updateHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const hotel = yield hotel_model_1.HotelModel.updateHotel(id, updateData);
                if (!hotel) {
                    res.status(404).json({
                        success: false,
                        error: 'Hotel not found'
                    });
                    return;
                }
                res.json({
                    success: true,
                    message: 'Hotel updated successfully',
                    data: hotel
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message || 'Failed to update hotel'
                });
            }
        });
    }
    static uploadImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const files = req.files;
                if (!files || files.length === 0) {
                    res.status(400).json({
                        success: false,
                        error: 'No files uploaded'
                    });
                    return;
                }
                const imageUrls = files.map(file => `/uploads/${file.filename}`);
                const hotel = yield hotel_model_1.HotelModel.addHotelImages(id, imageUrls);
                if (!hotel) {
                    res.status(404).json({
                        success: false,
                        error: 'Hotel not found'
                    });
                    return;
                }
                res.json({
                    success: true,
                    message: 'Images uploaded successfully',
                    data: hotel
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message || 'Failed to upload images'
                });
            }
        });
    }
}
exports.HotelController = HotelController;
