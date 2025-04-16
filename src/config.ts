import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  databaseHost: string;
  databasePort: number;
  databaseUser: string;
  databasePassword: string;
  databaseName: string;
  serverPort: number;
  serverHost: string;
  user: {
    secretKey: string;
  };
}

const config: IConfig = {
  databaseHost: process.env.DATABASE_HOST || 'localhost',
  databasePort: parseInt(process.env.DATABASE_PORT || '27018', 10),
  databaseUser: process.env.DATABASE_USER || 'avanti',
  databasePassword: process.env.DATABASE_PASSWORD || 'avanti',
  databaseName: process.env.DATABASE_NAME || 'avanti',
  serverPort: parseInt(process.env.SERVER_PORT || '3000', 10),
  serverHost: process.env.SERVER_HOST || 'localhost',
  user: {
    secretKey: process.env.SECRET_KEY || 'defaultSecretKey',
  },
};

export default config;
