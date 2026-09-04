require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDatabase = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Review = require('../models/Review');
const Order = require('../models/Order');
const { products, categories } = require('./data');

async function seed() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Category.deleteMany({}),
      Review.deleteMany({}),
      Order.deleteMany({})
    ]);

    const passwordHash = await bcrypt.hash('demo123', 12);
    const adminPasswordHash = await bcrypt.hash('admin123', 12);

    const users = await User.insertMany([
      {
        name: 'Alex Morgan',
        email: 'alex@example.com',
        password: passwordHash,
        phone: '+91 90000 00001',
        address: '12 Park Avenue',
        city: 'Hyderabad',
        state: 'Telangana',
        postalCode: '500001',
        country: 'India',
        role: 'customer'
      },
      {
        name: 'Maya Chen',
        email: 'maya@example.com',
        password: passwordHash,
        phone: '+91 90000 00002',
        address: '45 Lake Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560001',
        country: 'India',
        role: 'customer'
      },
      {
        name: 'Noah Patel',
        email: 'noah@example.com',
        password: passwordHash,
        phone: '+91 90000 00003',
        address: '9 Residency Lane',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        role: 'customer'
      },
      {
        name: 'Sara Williams',
        email: 'sara@example.com',
        password: passwordHash,
        phone: '+91 90000 00004',
        address: '77 Garden Street',
        city: 'Chennai',
        state: 'Tamil Nadu',
        postalCode: '600001',
        country: 'India',
        role: 'customer'
      },
      {
        name: 'Atelier Admin',
        email: 'admin@atelier.demo',
        password: adminPasswordHash,
        phone: '+91 90000 00099',
        address: 'Atelier HQ',
        city: 'Hyderabad',
        state: 'Telangana',
        postalCode: '500032',
        country: 'India',
        role: 'admin'
      }
    ]);

    const insertedCategories = await Category.insertMany(categories);
    const insertedProducts = await Product.insertMany(products);

    const reviewUsers = users.filter((user) => user.role === 'customer');
    const reviewProducts = insertedProducts.slice(0, 8);

    const reviews = reviewProducts.map((product, index) => ({
      productId: product._id,
      userId: reviewUsers[index % reviewUsers.length]._id,
      userName: reviewUsers[index % reviewUsers.length].name,
      rating: index % 2 ? 5 : 4,
      title: index % 2 ? 'Beautifully made' : 'Exactly what I wanted',
      comment: 'The finish feels premium and the product arrived exactly as described.',
      createdAt: new Date()
    }));

    await Review.insertMany(reviews);

    await Promise.all(
      reviewProducts.map(async (product) => {
        const count = reviews.filter(
          (review) => review.productId.toString() === product._id.toString()
        ).length;

        await Product.findByIdAndUpdate(product._id, {
          reviewCount: count,
          rating: reviews.find(
            (review) => review.productId.toString() === product._id.toString()
          )?.rating || 0
        });
      })
    );

    console.log(`Seeded ${insertedProducts.length} products.`);
    console.log(`Seeded ${insertedCategories.length} categories.`);
    console.log(`Seeded ${users.length} users.`);
    console.log('Customer login: alex@example.com / demo123');
    console.log('Admin login: admin@atelier.demo / admin123');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seed();
