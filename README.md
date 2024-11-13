# NodeJS-ExpressJS
# Hotel API

A backend API for managing hotels, rooms, and their images, allowing you to create, update, and retrieve hotel and room information with images.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [File Structure](#file-structure)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Features
- **Hotel Management**: Create, update, and fetch hotels by ID or slug.
- **Room Management**: Upload images for rooms along with hotel creation.
- **Image Uploads**: Support for multiple images per hotel and room using multer.
## Installation

### Step 1: Clone the Repository

- `git clone [repo-url>](https://github.com/siddiqua14/NodeJS-ExpressJS.git)`
- `cd hotel-api`

### Step 2: Install Required Packages
Install all necessary packages listed in `package.json` by running:
- `npm install`

#### Packages Installed
- `express` - Fast and lightweight web framework for Node.js
- `multer` - Middleware for handling file uploads
- `path`, `fs` - Node.js native modules for file and path operations
- `slugify` - For generating URL-friendly slugs from titles
- `jest`, `supertest` - For testing API endpoints

## Database Setup
For this setup, storing data in JSON files under a `data` folder.
### Step 1: Create a Data Folder
In the project root, create a `data` folder:
`mkdir data`
This folder will store each hotel’s JSON file.
## File Structure
project structure:
hotel-api/
│
├── src/
│   ├── controllers/
│   │   └── hotel.controller.ts       # Main controller for handling API logic
│   ├── middleware/
│   │   └── hotel.middleware.ts       # Middleware setup for file uploads (Multer)
│   │   └── validationErrorHandler.ts # Error handling middleware
│   ├── routes/
│   │   └── hotel.routes.ts           # API routes configuration
│   ├── models/
│   │   └── hotel.types.ts            # TypeScript types for data
│   ├── data/                         # Folder for JSON data files
|   ├── uploads/                      # Folder for storing uploaded images
|   |   └── rooms/                    # Folder for storing uploaded images-->Rooms
|   ├── validations/                  # Input validation rules and schemas
|   ├── app.ts                        # Main application file
|   └── server.ts                     # Server configuration and startup
|
├── _test_/                           # Folder containing test files
│   └── hotel.test.ts                 # Tests for API endpoints
├── hotel-api.postman_collection.json # Postman collection for API testing
├── jest.config.js                    # Jest testing configuration
├── package-lock.json                 
├── package.json                      # Project dependencies and scripts
├── README.md
└── tsconfig.json                     # TypeScript configuration

## Running the Application

### Step 1: Compile TypeScript
Compile the code by running:
- `npx tsc`
### Step 2: Start the Server
Start the server using:
- `npm start`
The API should now be running on http://localhost:5050.

## API Endpoints

### 1. Create a New Hotel
- **Method**: `POST`
- **Endpoint**: `/hotel`
- **Body**:
    ```json
    {
    "title": "Season Hotel",
    "description": "A Luxury place to stay",
    "guestCount": 5,
    "bedroomCount": 2,
    "bathroomCount": 2,
    "amenities": ["WiFi", "Air Conditioning"],
    "host": "John Doe",
    "address": "123 Street, City, Country",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "rooms": [
        {
        "roomSlug": "room1",
        "roomTitle": "Room 1",
        "bedroomCount": 1
        }
    ]
    }
    ```
- **Response**: `201 Created`

### 2. Get Hotel by ID or Slug
- **Method**: `GET`
- **Endpoint**: `/hotel/:idOrSlug`
- **Response**: `200 OK` or `404 Not Found`

### 3. Update Hotel by ID
- **Method**: `PUT`
- **Endpoint**: `/hotel/:id`
- **Body**:
    ```json
    { "title": "Updated Hotel Name" }
    ```
- **Response**: `200 OK` or `404 Not Found`

### 4. Upload Hotel Images
- **Method**: `POST`
- **Endpoint**: `/images/:id`
- **Form-Data**:
    - `images`: Upload images in form-data with key `images`.
- **Response**: `200 OK` or `404 Not Found`

### 5. Upload Room Images
- **Method**: `POST`
- **Endpoint**: `/room/images/:id/:roomSlug`
- **Form-Data**:
    - `images`: Upload images in form-data with key `images`.
- **Response**: `200 OK` or `404 Not Found`
## Testing

Jest and Supertest have been set up to test the API endpoints.

Ensure that you have the necessary test setup:
- **Jest** is set up for running tests.
- **Supertest** is used for making requests to the API during tests.
- Test files are located in the `_test_/` directory. For example, the file `hotel.test.ts` contains tests for the hotel API.
### Run Tests
To run the tests:
`npm test`
