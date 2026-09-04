const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const connectDatabase = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* =========================================================
   Middleware
========================================================= */

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      'http://localhost:3000',
    credentials: true
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(morgan('dev'));

/* =========================================================
   Static uploads
========================================================= */

const uploadPath = path.resolve(
  process.env.UPLOAD_DIR || 'uploads'
);

app.use(
  '/uploads',
  express.static(uploadPath)
);

/* =========================================================
   API Root
========================================================= */

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ATELIER Commerce API is running.',
    version: '1.0.0',
    environment:
      process.env.NODE_ENV || 'development',

    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
      orders: '/api/orders',
      reviews: '/api/reviews',
      users: '/api/users',
      dashboard: '/api/dashboard'
    }
  });
});

/* =========================================================
   Health Check
========================================================= */

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy.',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

/* =========================================================
   API Routes
========================================================= */

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use('/api/categories', categoryRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/reviews', reviewRoutes);

app.use('/api/users', userRoutes);

app.use('/api/dashboard', dashboardRoutes);

/* =========================================================
   404 Handler
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message:
      `Route ${req.method} ${req.originalUrl} was not found.`
  });
});

/* =========================================================
   Global Error Handler
========================================================= */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message ||
      'Internal server error.'
  });
});

/* =========================================================
   Start Server
========================================================= */

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(
        `ATELIER API running on http://localhost:${PORT}`
      );

      console.log(
        `Uploads available at http://localhost:${PORT}/uploads`
      );
    });
  } catch (error) {
    console.error(
      'Failed to start server:',
      error.message
    );

    process.exit(1);
  }
};

startServer();