import mongoose from 'mongoose';
import config from '../config';
import logger from '../helpers/logger';

export default async function connectToDataBase() {
  try {
    // Используем root пользователя для подключения
    const db = `mongodb://root:rootpassword@${config.databaseHost}:${config.databasePort}/${config.databaseName}?authSource=admin`;

    mongoose.set('strictQuery', true);

    // Используем URI со встроенными данными аутентификации вместо отдельных опций
    await mongoose.connect(db);
    console.log('Connected to db');
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
