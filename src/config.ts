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

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

function getEnvNumber(key: string, defaultValue?: number): number {
  const value = process.env[key];
  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${key} is not set`);
  }
  const numValue = parseInt(value, 10);
  if (isNaN(numValue)) {
    throw new Error(`Environment variable ${key} is not a valid number`);
  }
  return numValue;
}

const config: IConfig = {
  databaseHost: getEnv('DATABASE_HOST', 'localhost'),
  databasePort: getEnvNumber('DATABASE_PORT', 27018),
  databaseUser: getEnv('DATABASE_USER', 'avanti'),
  databasePassword: getEnv('DATABASE_PASSWORD', 'avanti'),
  databaseName: getEnv('DATABASE_NAME', 'avanti'),
  serverPort: getEnvNumber('SERVER_PORT', 3000),
  serverHost: getEnv('SERVER_HOST', 'localhost'),
  user: {
    secretKey: getEnv('SECRET_KEY', 'defaultSecretKey'),
  },
};

export default config;
