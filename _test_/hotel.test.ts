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
    it('should update an existing hotel', async () => {
        const response = await request(app).put('/api/hotel/1').send({
            title: 'Updated Hotel',
            description: 'Updated luxury hotel',
            guestCount: 10
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Hotel updated successfully');
    });

    it('should fetch hotel by ID or slug', async () => {
        const response = await request(app).get('/api/hotel/new-hotel'); // Assuming the slug is 'new-hotel'

        expect(response.status).toBe(200);
        expect(response.body.slug).toBe('new-hotel');
    });

    it('should upload hotel images', async () => {
        const response = await request(app)
            .post('/api/images/1')
            .attach('images', './test-image.jpg') // Assuming you have a test image file
            .set('Content-Type', 'multipart/form-data');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Images uploaded successfully');
    });

    it('should upload room images', async () => {
        const response = await request(app)
            .post('/api/room/images/1/room1') // Assuming room1 is a valid room slug
            .attach('images', './room-image.jpg') // Assuming you have a test image file for room
            .set('Content-Type', 'multipart/form-data');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Room images uploaded successfully');
    });
});
