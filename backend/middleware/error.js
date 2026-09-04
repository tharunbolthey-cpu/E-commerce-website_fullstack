function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} was not found.`
  });
}

function errorHandler(error, _req, res, _next) {
  console.error(error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: Object.values(error.errors).map((item) => item.message)
    });
  }

  if (error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'A record with the same unique value already exists.'
    });
  }

  if (error.message && error.message.includes('Only JPEG')) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal server error.'
  });
}

module.exports = {
  notFound,
  errorHandler
};
