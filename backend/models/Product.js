const mongoose = require('mongoose');

const productSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },

      shortDescription: {
        type: String,
        default: '',
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      originalPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      discount: {
        type: Number,
        default: 0,
      },

      category: {
        type: String,
        required: true,
      },

      brand: {
        type: String,
        required: true,
      },

      stock: {
        type: Number,
        required: true,
        min: 0,
      },

      sku: {
        type: String,
        required: true,
        unique: true,
      },

      images: {
        type: [String],
        default: [],
      },

      rating: {
        type: Number,
        default: 0,
      },

      reviewCount: {
        type: Number,
        default: 0,
      },

      featured: {
        type: Boolean,
        default: false,
      },

      bestseller: {
        type: Boolean,
        default: false,
      },

      newArrival: {
        type: Boolean,
        default: false,
      },

      specifications: {
        type: Object,
        default: {},
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models.Product ||
  mongoose.model(
    'Product',
    productSchema
  );