import request from 'supertest'; // to make HTTP requests to your express server
import app from '../src/app';    // Make sure this path is correct

describe('Hotel API Tests', () => {
    it('should create a new hotel', async () => {
        const response = await request(app).post('/api/hotel').send({
            title: 'New Hotel',
            description: 'Luxury hotel',
            guestCount: 5,
            bedroomCount: 2,
            bathroomCount: 2,
            amenities: ['WiFi', 'Air Conditioning'],
            host: 'John Doe',
            address: '123 Street, City',
            latitude: 40.7128,
            longitude: -74.0060,
            rooms: [
                {
                    hotelSlug: 'new-hotel',
                    roomSlug: 'room1',
                    roomTitle: 'Room 1',
                    bedroomCount: 1
                }
            ]
        });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Hotel created successfully');
    });
});
