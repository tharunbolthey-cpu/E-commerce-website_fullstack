const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDirectory = path.resolve(
  process.env.UPLOAD_DIR || 'uploads'
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (_req, file, callback) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const safeName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

    callback(null, safeName);
  },
});

const fileFilter = (_req, file, callback) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  if (
    !allowedMimeTypes.includes(
      file.mimetype
    )
  ) {
    return callback(
      new Error(
        'Only JPEG, PNG, WEBP and GIF images are allowed.'
      )
    );
  }

  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 8,
  },
});

module.exports = upload;