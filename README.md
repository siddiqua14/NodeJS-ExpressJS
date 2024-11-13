# NodeJS-ExpressJS
# Hotel API

A backend API for managing hotels, rooms, and their images, allowing you to create, update, and retrieve hotel and room information with images.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
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
## Environment Setup
1. Create an `.env` file in the root directory with the following variables:

- PORT=5050
2. Update other environment variables as needed, depending on your configuration (e.g., database connection, etc.).

## Database Setup
For this setup, we are storing data in JSON files under a `data` folder.
### Step 1: Create a Data Folder
In the project root, create a `data` folder:
mkdir data

## File Structure
project structure:
        hotel-api/ <br>
        │<br>
        ├── src/<br>
        │   ├── controllers/<br>
        │   │   └── hotel.controller.ts       # Main controller for handling API logic
        │   ├── middleware/
        │   │   └── hotel.middleware.ts       # Middleware setup for file uploads (Multer)
        │   ├── routes/
        │   │   └── hotel.routes.ts           # API routes configuration
        │   └── models/
        │       └── hotel.types.ts            # TypeScript types for data
        │
        ├── uploads/                          # Folder for storing uploaded images
        ├── data/                             # Folder for JSON data files
        ├── _test_/
        │   └── hotel.test.ts                 # Tests for API endpoints
        │
        ├── .env                              # Environment variables
        ├── .gitignore                        # Files to ignore in git
        ├── package.json                      # Project dependencies and scripts
        └── README.md                         # Documentation

## Running the Application

### Step 1: Compile TypeScript
Compile the code by running:
- npx tsc
### Step 2: Start the Server
Start the server using:
- npm start 
The API should now be running on http://localhost:5050.

## API Endpoints

### 1. Create a New Hotel
- **Method**: `POST`
- **Endpoint**: `/hotel`
- **Body**:
    ```json
    {
      "title": "Hotel Name",
      "description": "Hotel Description",
      "rooms": [
        { "title": "Room A", "slug": "room-a" },
        { "title": "Room B", "slug": "room-b" }
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

Create a test file in `_test_/hotel.test.ts`.

Run tests with:
npm test -watch