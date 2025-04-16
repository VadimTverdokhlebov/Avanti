import express, { Request, Response, NextFunction } from 'express';
import config from './config';
import connectToDataBase from './persistence/connect';
import indexRouter from './routes/indexRouter';
import errorsMiddleware from './middlewares/errorsMiddleware';
import logger from './helpers/logger';

(async () => {
  try {
    const connected = await connectToDataBase();

    if (!connected) {
      console.error('Failed to connect to database. Exiting.');
      process.exit(1);
    }

    const app = express();
    const PORT = config.serverPort;
    const HOST = config.serverHost;

    app.use(express.json());
    app.use('/', indexRouter);

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      errorsMiddleware(err as Error, req, res, next);
    });

    app.listen(PORT, () => console.log(`Server listens http://${HOST}:${PORT}`));
  } catch (error) {
    console.error('Server initialization error:', error);
    process.exit(1);
  }
})();
