const Order = require('../models/Order');
const Product = require('../models/Product');

const allowedStatuses = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled'
];

async function createOrder(req, res, next) {
  try {
    const { items, customer, paymentMethod, discount = 0 } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one order item is required.'
      });
    }

    const productIds = items.map((item) => item.productId);
    const products = await Product.find({
      _id: { $in: productIds }
    });

    const productMap = new Map(
      products.map((product) => [product._id.toString(), product])
    );

    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = productMap.get(item.productId);
      const quantity = Number(item.quantity);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} was not found.`
        });
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Order quantities must be positive whole numbers.'
        });
      }

      if (quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `${product.name} does not have enough stock.`
        });
      }

      subtotal += product.price * quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.images[0] || ''
      });
    }

    const safeDiscount = Math.max(Number(discount) || 0, 0);
    const shipping = subtotal >= 100 ? 0 : 10;
    const taxableAmount = Math.max(subtotal - safeDiscount, 0);
    const tax = Math.round(taxableAmount * 0.05 * 100) / 100;
    const total = taxableAmount + shipping + tax;

    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      subtotal,
      discount: safeDiscount,
      shipping,
      tax,
      total,
      customer,
      paymentMethod
    });

    await Promise.all(
      orderItems.map((item) =>
        Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity }
        })
      )
    );

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res, next) {
  try {
    const query = { _id: req.params.id };

    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }

    const order = await Order.findOne(query).populate(
      'userId',
      'name email phone'
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.search) {
      filter._id = req.query.search;
    }

    const orders = await Order.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status.'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus
};
