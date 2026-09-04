const Product = require('../models/Product');

/* =========================================================
   GET ALL PRODUCTS
========================================================= */

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(
      'Get products error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        'Failed to get products.',
    });
  }
};

/* =========================================================
   GET SINGLE PRODUCT
========================================================= */

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      'Get product error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        'Failed to get product.',
    });
  }
};

/* =========================================================
   CREATE PRODUCT
========================================================= */

const createProduct = async (
  req,
  res
) => {
  try {
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      originalPrice,
      discount,
      category,
      brand,
      stock,
      sku,
      rating,
      reviewCount,
      featured,
      bestseller,
      newArrival,
    } = req.body;

    const images =
      req.files
        ? req.files.map(
            (file) =>
              `/uploads/${file.filename}`
          )
        : [];

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          'At least one product image is required.',
      });
    }

    const product =
      await Product.create({
        name,
        slug,
        description,
        shortDescription,

        price:
          Number(price),

        originalPrice:
          Number(originalPrice),

        discount:
          Number(discount || 0),

        category,
        brand,

        stock:
          Number(stock),

        sku,

        images,

        rating:
          Number(rating || 0),

        reviewCount:
          Number(reviewCount || 0),

        featured:
          featured === 'true' ||
          featured === true,

        bestseller:
          bestseller === 'true' ||
          bestseller === true,

        newArrival:
          newArrival === 'true' ||
          newArrival === true,
      });

    return res.status(201).json({
      success: true,
      message:
        'Product created successfully.',
      product,
    });
  } catch (error) {
    console.error(
      'Create product error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        'Failed to create product.',
    });
  }
};

/* =========================================================
   UPDATE PRODUCT
========================================================= */

const updateProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          'Product not found.',
      });
    }

    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      originalPrice,
      discount,
      category,
      brand,
      stock,
      sku,
      rating,
      reviewCount,
      featured,
      bestseller,
      newArrival,
    } = req.body;

    let images =
      product.images;

    if (
      req.files &&
      req.files.length > 0
    ) {
      images =
        req.files.map(
          (file) =>
            `/uploads/${file.filename}`
        );
    }

    product.name =
      name ?? product.name;

    product.slug =
      slug ?? product.slug;

    product.description =
      description ??
      product.description;

    product.shortDescription =
      shortDescription ??
      product.shortDescription;

    product.price =
      price !== undefined
        ? Number(price)
        : product.price;

    product.originalPrice =
      originalPrice !== undefined
        ? Number(originalPrice)
        : product.originalPrice;

    product.discount =
      discount !== undefined
        ? Number(discount)
        : product.discount;

    product.category =
      category ??
      product.category;

    product.brand =
      brand ??
      product.brand;

    product.stock =
      stock !== undefined
        ? Number(stock)
        : product.stock;

    product.sku =
      sku ??
      product.sku;

    product.images =
      images;

    product.rating =
      rating !== undefined
        ? Number(rating)
        : product.rating;

    product.reviewCount =
      reviewCount !== undefined
        ? Number(reviewCount)
        : product.reviewCount;

    if (
      featured !== undefined
    ) {
      product.featured =
        featured === 'true' ||
        featured === true;
    }

    if (
      bestseller !== undefined
    ) {
      product.bestseller =
        bestseller === 'true' ||
        bestseller === true;
    }

    if (
      newArrival !== undefined
    ) {
      product.newArrival =
        newArrival === 'true' ||
        newArrival === true;
    }

    await product.save();

    return res.json({
      success: true,
      message:
        'Product updated successfully.',
      product,
    });
  } catch (error) {
    console.error(
      'Update product error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        'Failed to update product.',
    });
  }
};

/* =========================================================
   DELETE PRODUCT
========================================================= */

const deleteProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    console.log(
      'DELETE PRODUCT ID:',
      id
    );

    if (!id) {
      return res.status(400).json({
        success: false,
        message:
          'Product ID is required.',
      });
    }

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          'Product not found.',
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        'Product deleted successfully.',
      product,
    });
  } catch (error) {
    console.error(
      'Delete product error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Failed to delete product.',
      error:
        error.message,
    });
  }
};

/* =========================================================
   EXPORT
========================================================= */

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};