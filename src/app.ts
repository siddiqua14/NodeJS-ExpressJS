// src/app.ts
import express from 'express';
import path from 'path';
import hotelRoutes from './routes/hotel.routes';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api', hotelRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
