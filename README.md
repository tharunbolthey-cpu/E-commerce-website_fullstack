# Atelier Commerce — Premium E-commerce

A premium, mobile-first e-commerce application built with Next.js, React, TypeScript and CSS, now packaged with a complete Node.js REST backend.

## Project structure

```text
premium-shop/
├── app/                 # Next.js App Router pages
├── components/          # Reusable React components
├── context/              # Frontend context files
├── data/                 # Frontend demo data
├── hooks/                # Frontend hooks
├── lib/                  # Frontend utilities and API helper
├── public/               # Public assets
├── types/                # TypeScript types
├── backend/              # Node.js + Express + MongoDB API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Frontend

```bash
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

## Backend

Create the backend environment file:

```bash
cd backend
cp .env.example .env
npm install
```

Start MongoDB, then seed the database:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

## Backend technology

The backend now uses:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS
- Morgan

## Authentication

The backend uses JWT bearer authentication for protected routes.

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Passwords are hashed with bcryptjs before being stored in MongoDB.

## Image uploads

Admin users can upload product images through Multer:

```text
POST /api/products/upload
```

Multipart field:

```text
images
```

Supported image formats:

- JPEG
- PNG
- WEBP
- GIF

Maximum file size is 5 MB per image, with up to 8 images per request.

## Demo backend accounts

Customer:

```text
alex@example.com
Demo password: demo123
```

Admin:

```text
admin@atelier.demo
Demo password: admin123
```

These are development/demo credentials. Change them before deployment.

## Backend route groups

```text
/api/health
/api/auth
/api/products
/api/categories
/api/orders
/api/reviews
/api/users
/api/dashboard
```

The complete backend route list is documented in `backend/README.md`.

## Important

The existing frontend continues to support its original localStorage demo flows. The new backend is included as a real REST API layer using MongoDB, JWT and Multer. The frontend API helper is available at `lib/api.ts` and reads `NEXT_PUBLIC_API_URL` from `.env.local`.
