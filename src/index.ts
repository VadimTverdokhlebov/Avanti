import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import path from 'path';
import config from './config';
import connectToDataBase from './persistence/connect';
import indexRouter from './routes/indexRouter';
import errorsMiddleware from './middlewares/errorsMiddleware';

function startServer() {
  try {
    const app = express();
    const PORT = config.serverPort;
    const HOST = config.serverHost;
    const publicPath = path.join(__dirname, 'public');

    app.use(express.json());
    app.use(express.static(publicPath));
    app.use('/', indexRouter);
    
    // Используем error-handling middleware в соответствии с требованиями Express 5
    app.use((
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      errorsMiddleware(err as Error, req, res, next);
    });

    app.listen(PORT, () => console.log(`Server listens http://${HOST}:${PORT}`));
  } catch (error) {
    console.error('Start server error:', error);
  }
}

connectToDataBase().then(() => startServer());
