"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const hotel_routes_1 = __importDefault(require("./routes/hotel.routes"));
const path_1 = __importDefault(require("path"));
//export default app;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', hotel_routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
const port = 5050;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app; // Export the app for use in tests
