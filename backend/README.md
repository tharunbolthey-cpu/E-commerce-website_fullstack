# Atelier Commerce Backend

This is the Node.js backend for the Atelier Commerce premium e-commerce application.

## Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing
- Multer image uploads
- CORS
- Morgan request logging

## Setup

1. Make sure MongoDB is running locally or use a MongoDB connection string.
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI` and a strong `JWT_SECRET`.
4. Install backend dependencies.

```bash
cd backend
npm install
```

5. Seed the database with the 30 products, 10 categories and demo accounts.

```bash
npm run seed
```

6. Start the backend.

```bash
npm run dev
```

The API runs at `http://localhost:5000` by default.

## Demo accounts

Customer:

- Email: `alex@example.com`
- Password: `demo123`

Admin:

- Email: `admin@atelier.demo`
- Password: `admin123`

Change these demo credentials and the JWT secret before using the application outside local development.

## Main API routes

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PUT /api/auth/profile`

### Products

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` — admin
- `PUT /api/products/:id` — admin
- `DELETE /api/products/:id` — admin
- `POST /api/products/upload` — admin, multipart field `images`

### Categories

- `GET /api/categories`
- `GET /api/categories/:slug`
- `POST /api/categories` — admin
- `PUT /api/categories/:id` — admin
- `DELETE /api/categories/:id` — admin

### Orders

- `POST /api/orders`
- `GET /api/orders/my`
- `GET /api/orders/:id`
- `GET /api/orders` — admin
- `PATCH /api/orders/:id/status` — admin

### Reviews

- `GET /api/reviews/product/:productId`
- `POST /api/reviews/product/:productId`
- `PUT /api/reviews/:id`
- `DELETE /api/reviews/:id`
- `GET /api/reviews` — admin

### Users

- `GET /api/users` — admin
- `GET /api/users/:id` — admin
- `PUT /api/users/:id` — admin
- `DELETE /api/users/:id` — admin

### Dashboard

- `GET /api/dashboard/stats` — admin

### Health

- `GET /api/health`

## JWT usage

After login or registration, the API returns a JWT access token.

Send it on protected requests using:

```text
Authorization: Bearer YOUR_TOKEN
```

## Image uploads

Admin image uploads use Multer.

Send a multipart/form-data request to:

```text
POST /api/products/upload
```

Use the field name:

```text
images
```

The backend accepts JPEG, PNG, WEBP and GIF files up to 5 MB each, with up to 8 files per request.

Uploaded files are served from `/uploads/<filename>`.
