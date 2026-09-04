const User = require('../models/User');
const { createAccessToken } = require('../config/auth');

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    city: user.city,
    state: user.state,
    postalCode: user.postalCode,
    country: user.country,
    role: user.role,
    active: user.active,
    avatar: user.avatar,
    createdAt: user.createdAt
  };
}

async function register(req, res, next) {
  try {
    const {
      name,
      email,
      password,
      phone,
      address,
      city,
      state,
      postalCode,
      country
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required.'
      });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      address,
      city,
      state,
      postalCode,
      country
    });

    const token = createAccessToken(user);

    res.status(201).json({
      success: true,
      token,
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    if (!user.active) {
      return res.status(403).json({
        success: false,
        message: 'This account has been deactivated.'
      });
    }

    const token = createAccessToken(user);

    res.json({
      success: true,
      token,
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res) {
  res.json({
    success: true,
    user: publicUser(req.user)
  });
}

async function updateProfile(req, res, next) {
  try {
    const allowedFields = [
      'name',
      'phone',
      'address',
      'city',
      'state',
      'postalCode',
      'country',
      'avatar'
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    res.json({
      success: true,
      user: publicUser(user)
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  me,
  updateProfile
};
