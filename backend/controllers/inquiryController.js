const Inquiry = require('../models/Inquiry');

const createInquiry = async (
  req,
  res,
  next
) => {
  try {
    const {
      productId,
      subject,
      message,
    } = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message:
          'Subject and message are required.',
      });
    }

    const inquiry =
      await Inquiry.create({
        user: req.user.id,

        product:
          productId || null,

        subject,

        message,
      });

    const populatedInquiry =
      await Inquiry.findById(
        inquiry._id
      )
        .populate(
          'user',
          'name email phone'
        )
        .populate(
          'product',
          'name price images'
        );

    return res.status(201).json({
      success: true,
      message:
        'Inquiry sent successfully.',
      inquiry: populatedInquiry,
    });
  } catch (error) {
    next(error);
  }
};

const getMyInquiries = async (
  req,
  res,
  next
) => {
  try {
    const inquiries =
      await Inquiry.find({
        user: req.user.id,
      })
        .populate(
          'product',
          'name price images'
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      inquiries,
    });
  } catch (error) {
    next(error);
  }
};

const getAllInquiries = async (
  req,
  res,
  next
) => {
  try {
    const inquiries =
      await Inquiry.find()
        .populate(
          'user',
          'name email phone'
        )
        .populate(
          'product',
          'name price images'
        )
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      inquiries,
    });
  } catch (error) {
    next(error);
  }
};

const replyToInquiry = async (
  req,
  res,
  next
) => {
  try {
    const {
      adminReply,
    } = req.body;

    const inquiry =
      await Inquiry.findById(
        req.params.id
      );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message:
          'Inquiry not found.',
      });
    }

    inquiry.adminReply =
      adminReply;

    inquiry.status =
      'Replied';

    await inquiry.save();

    res.json({
      success: true,
      message:
        'Reply sent successfully.',
      inquiry,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getMyInquiries,
  getAllInquiries,
  replyToInquiry,
};