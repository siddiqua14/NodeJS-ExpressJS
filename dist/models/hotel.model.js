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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelModel = void 0;
// src/models/hotel.model.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const dataFilePath = path_1.default.join(__dirname, '../../data/hotels.json');
class HotelModel {
    static readDataFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.default.existsSync(dataFilePath)) {
                yield fs_1.default.promises.writeFile(dataFilePath, '[]');
            }
            const data = yield fs_1.default.promises.readFile(dataFilePath, 'utf-8');
            return JSON.parse(data);
        });
    }
    static writeDataFile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.default.promises.writeFile(dataFilePath, JSON.stringify(data, null, 2));
        });
    }
    static createHotel(hotelData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotels = yield this.readDataFile();
            const newHotel = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, hotelData), { images: [], rooms: hotelData.rooms.map(room => (Object.assign(Object.assign({}, room), { id: (0, uuid_1.v4)(), images: [] }))), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
            hotels.push(newHotel);
            yield this.writeDataFile(hotels);
            return newHotel;
        });
    }
    static getHotelById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotels = yield this.readDataFile();
            return hotels.find(hotel => hotel.id === id) || null;
        });
    }
    static updateHotel(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hotels = yield this.readDataFile();
                const hotelIndex = hotels.findIndex(hotel => hotel.id === id);
                if (hotelIndex === -1)
                    return null;
                const updatedHotel = Object.assign(Object.assign(Object.assign({}, hotels[hotelIndex]), updateData), { updatedAt: new Date().toISOString() }); // Type assertion to Hotel
                hotels[hotelIndex] = updatedHotel;
                yield this.writeDataFile(hotels);
                return updatedHotel;
            }
            catch (error) {
                console.error('Error updating hotel:', error);
                throw new Error('Failed to update hotel');
            }
        });
    }
    static addHotelImages(id, imageUrls) {
        return __awaiter(this, void 0, void 0, function* () {
            const hotels = yield this.readDataFile();
            const hotelIndex = hotels.findIndex(hotel => hotel.id === id);
            if (hotelIndex === -1)
                return null;
            hotels[hotelIndex].images = [...hotels[hotelIndex].images, ...imageUrls];
            hotels[hotelIndex].updatedAt = new Date().toISOString();
            yield this.writeDataFile(hotels);
            return hotels[hotelIndex];
        });
    }
}
exports.HotelModel = HotelModel;
