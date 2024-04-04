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
    databaseHost: process.env.DATABASE_HOST!,
    databasePort: parseInt(process.env.DATABASE_PORT!, 10),
    databaseUser: process.env.DATABASE_USER!,
    databasePassword: process.env.DATABASE_PASSWORD!,
    databaseName: process.env.DATABASE_NAME!,
    serverPort: parseInt(process.env.SERVER_PORT!, 10),
    serverHost: process.env.SERVER_HOST!,
    user: {
        secretKey: process.env.SECRET_KEY!
    }
};

export default config;
