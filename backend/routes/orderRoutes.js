const express = require('express');
const {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', createOrder);
router.get('/my', getMyOrders);
router.get('/', authorize('admin'), getAllOrders);
router.get('/:id', getOrder);
router.patch('/:id/status', authorize('admin'), updateOrderStatus);

module.exports = router;
