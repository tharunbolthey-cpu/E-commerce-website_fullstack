const mongoose = require('mongoose');

async function connectDatabase() {
  console.log('=================================');
  console.log('MONGODB CONNECTION DEBUG');
  console.log('=================================');

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('❌ MONGODB_URI is missing.');
    throw new Error('MONGODB_URI is not configured.');
  }

  console.log('✅ MONGODB_URI exists.');

  try {
    const parsedUri = new URL(mongoUri);

    console.log('MongoDB protocol:', parsedUri.protocol);
    console.log('MongoDB host:', parsedUri.hostname);
    console.log('MongoDB username:', parsedUri.username || '[MISSING]');
    console.log(
      'MongoDB password:',
      parsedUri.password ? '[PRESENT]' : '[MISSING]'
    );
    console.log(
      'MongoDB database:',
      parsedUri.pathname || '[DEFAULT]'
    );

    console.log('⏳ Connecting to MongoDB Atlas...');

    await mongoose.connect(mongoUri);

    console.log('✅ MongoDB connected successfully.');
    console.log('Connected database:', mongoose.connection.name);
    console.log('Connected host:', mongoose.connection.host);
    console.log('=================================');
  } catch (error) {
    console.error('❌ MongoDB connection failed.');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);

    if (error.reason) {
      console.error('MongoDB reason:', error.reason);
    }

    console.error('=================================');

    throw error;
  }
}

module.exports = connectDatabase;