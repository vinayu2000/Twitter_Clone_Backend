import mongoose from 'mongoose';

export const databaseConnection = async () => {
  try {
    const connection = await mongoose.connect(`mongodb://localhost:27017/Twitter-Clone`)
    if (connection) {
      console.log('Database connection successful');
    } else {
      console.log('Failed to connect to the database');
    }
  }
  catch (error) {
    console.log('MongoDb database connection error', error);
  }
}