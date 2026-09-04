const Review = require('../models/Review');
const Product = require('../models/Product');

async function refreshProductRating(productId) {
  const [summary] = await Review.aggregate([
    {
      $match: {
        productId
      }
    }
  ,
    {
      $group: {
        _id: '$productId',
        rating: { $avg: '$rating' },
        reviewCount: { $sum: 1 }
      }
    }
  ]);

  await Product.findByIdAndUpdate(productId, {
    rating: summary ? Math.round(summary.rating * 10) / 10 : 0,
    reviewCount: summary ? summary.reviewCount : 0
  });
}

async function getProductReviews(req, res, next) {
  try {
    const reviews = await Review.find({
      productId: req.params.productId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.'
      });
    }

    const review = await Review.create({
      productId: product._id,
      userId: req.user._id,
      userName: req.user.name,
      rating: req.body.rating,
      title: req.body.title,
      comment: req.body.comment
    });

    await refreshProductRating(product._id);

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
}

async function updateReview(req, res, next) {
  try {
    const review = await Review.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user._id
      },
      {
        rating: req.body.rating,
        title: req.body.title,
        comment: req.body.comment
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you are not the owner.'
      });
    }

    await refreshProductRating(review.productId);

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const filter = { _id: req.params.id };

    if (req.user.role !== 'admin') {
      filter.userId = req.user._id;
    }

    const review = await Review.findOneAndDelete(filter);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found.'
      });
    }

    await refreshProductRating(review.productId);

    res.json({
      success: true,
      message: 'Review deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
}

async function getAllReviews(req, res, next) {
  try {
    const filter = {};

    if (req.query.productId) {
      filter.productId = req.query.productId;
    }

    if (req.query.rating) {
      filter.rating = Number(req.query.rating);
    }

    const reviews = await Review.find(filter)
      .populate('productId', 'name')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews
};
