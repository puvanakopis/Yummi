import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'yummiDB',
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

export default connectDB;