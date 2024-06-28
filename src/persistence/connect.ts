import mongoose from 'mongoose';
import config from '../config';

export default async function connectToDataBase() {
  const db = `mongodb://${config.databaseHost}:${config.databasePort}/${config.databaseName}`;

  const optionsDataBase = {
    authSource: 'admin',
    user: config.databaseUser,
    pass: config.databasePassword
  };

  mongoose.set('strictQuery', true);

  mongoose
    .connect(db)
    .then(() => {
      console.log('Connected to db');
    })
    .catch(error => console.log(error));
}
