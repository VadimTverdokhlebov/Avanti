import express from 'express';
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
    app.use(errorsMiddleware);

    app.listen(PORT, () => console.log(`Server listens http://${HOST}:${PORT}`));
  } catch (error) {
    console.error('Start server error:', error);
  }
}

connectToDataBase().then(() => startServer());
