import mongoose from 'mongoose';
import config from '../config';
import logger from '../helpers/logger';

export default async function connectToDataBase() {
  try {
    const db = `mongodb://root:rootpassword@${config.databaseHost}:${config.databasePort}/${config.databaseName}?authSource=admin`;

    mongoose.set('strictQuery', true);

    await mongoose.connect(db);
    console.log('Connection to the database was successful');
    return true;
  } catch (error) {
    logger.error({
      message: 'Database connection error',
      stack: error instanceof Error ? error.stack : 'No stack trace available',
    });
    console.error('Failed to connect to database:', error);
    return false;
  }
}
