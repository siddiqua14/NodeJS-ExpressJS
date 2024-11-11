"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const hotel_routes_1 = __importDefault(require("./routes/hotel.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Create required directories
const uploadsDir = path_1.default.join(__dirname, '../uploads');
const dataDir = path_1.default.join(__dirname, '../data');
[uploadsDir, dataDir].forEach(dir => {
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
});
// Initialize data file if it doesn't exist
const dataFile = path_1.default.join(dataDir, 'hotels.json');
if (!fs_1.default.existsSync(dataFile)) {
    fs_1.default.writeFileSync(dataFile, '[]', 'utf-8');
}
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use('/api', hotel_routes_1.default);
// Error handling middleware
app.use(error_middleware_1.errorHandler);
// Global error handler for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
