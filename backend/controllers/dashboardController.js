const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');

async function getDashboardStats(_req, res, next) {
  try {
    const [totalProducts, totalUsers, totalOrders, revenue, pendingOrders, deliveredOrders, lowStockProducts] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Order.countDocuments({ status: 'Pending' }),
      Order.countDocuments({ status: 'Delivered' }),
      Product.countDocuments({ stock: { $lte: 5 } })
    ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalUsers,
        totalOrders,
        totalRevenue: revenue[0]?.total || 0,
        pendingOrders,
        deliveredOrders,
        lowStockProducts
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboardStats
};
