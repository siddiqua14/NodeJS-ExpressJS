// _tests_/hotel.test.ts
import request from 'supertest';
import app from '../src/app'; // should work without errors

describe("Hotel API", () => {
    let createdHotel: { id: string; slug: string };

    it("should create a new hotel", async () => {
        const response = await request(app)
            .post('/api/hotel')
            .send({
                title: "Test Hotel",
                description: "A great place to stay",
                guestCount: 4,
                bedroomCount: 2,
                bathroomCount: 1,
                amenities: ["WiFi", "TV"],
                host: "Test Host",
                address: "123 Test St",
                latitude: 12.34567,
                longitude: 98.76543,
                rooms: [
                    {
                        hotelSlug: "test-hotel",
                        roomSlug: "room-1",
                        roomImage: "image-url",
                        roomTitle: "Room 1",
                        bedroomCount: 1
                    }
                ]
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Hotel created successfully");
        createdHotel = response.body.hotel;
    });

    it("should retrieve the created hotel by ID", async () => {
        const response = await request(app)
            .get(`/api/hotel/${createdHotel.id}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Test Hotel");
    });

    it("should retrieve the created hotel by slug", async () => {
        const response = await request(app)
            .get(`/api/hotel/${createdHotel.slug}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Test Hotel");
    });

    it("should update the hotel details", async () => {
        const response = await request(app)
            .put(`/api/hotel/${createdHotel.id}`)
            .send({ title: "Updated Hotel Title" });

        expect(response.status).toBe(200);
        expect(response.body.hotel.title).toBe("Updated Hotel Title");
    });
});
