const express = require('express');

const upload =
  require('../middleware/upload');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require(
  '../controllers/productController'
);

const router =
  express.Router();

/* =========================================================
   GET ALL PRODUCTS
========================================================= */

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Products route is working'
  });
});

/* =========================================================
   GET SINGLE PRODUCT
========================================================= */

router.get(
  '/:id',
  getProduct
);

/* =========================================================
   CREATE PRODUCT
========================================================= */

router.post(
  '/',
  upload.array('images', 8),
  createProduct
);

/* =========================================================
   UPDATE PRODUCT
========================================================= */

router.put(
  '/:id',
  upload.array('images', 8),
  updateProduct
);

/* =========================================================
   DELETE PRODUCT
========================================================= */

router.delete(
  '/:id',
  deleteProduct
);

module.exports = router;