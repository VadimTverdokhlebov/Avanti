import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import path from 'path';
import config from './config';
import connectToDataBase from './persistence/connect';
import indexRouter from './routes/indexRouter';
import errorsMiddleware from './middlewares/errorsMiddleware';
import logger from './helpers/logger';

process.on('uncaughtException', (error) => {
  logger.error({ 
    message: `Uncaught Exception: ${error.message}`, 
    stack: error.stack 
  });
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error({ 
    message: 'Unhandled Promise Rejection', 
    reason: reason instanceof Error ? reason.message : reason,
    stack: reason instanceof Error ? reason.stack : 'No stack trace available'
  });
});

function startServer() {
  try {
    const app = express();
    const PORT = config.serverPort;
    const HOST = config.serverHost;
    const publicPath = path.join(__dirname, 'public');

    app.use(express.json());
    app.use(express.static(publicPath));
    app.use('/', indexRouter);
    
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
    logger.error({ 
      message: 'Start server error', 
      stack: error instanceof Error ? error.stack : 'No stack trace available'
    });
  }
}

async function init() {
  let connected = false;
  let attempts = 0;
  const maxAttempts = 5;
  
  while (!connected && attempts < maxAttempts) {
    attempts++;
    console.log(`Attempting to connect to database (${attempts}/${maxAttempts})...`);
    connected = await connectToDataBase();
    
    if (!connected && attempts < maxAttempts) {
      console.log(`Connection failed. Retrying in 3 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  if (connected) {
    startServer();
  } else {
    console.error(`Failed to connect to database after ${maxAttempts} attempts. Exiting.`);
    process.exit(1);
  }
}

init();
