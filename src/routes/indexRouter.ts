import express, { RequestHandler } from 'express';
import authRouter from './authRouter';
import wordRouter from './wordRouter';
import wordPackRouter from './wordPackRouter';
import authJwtMiddleware from '../middlewares/authJwtMiddleware';

const indexRouter = express.Router();

indexRouter.use('/api', authRouter);
indexRouter.use('/api', authJwtMiddleware as RequestHandler, wordRouter);
indexRouter.use('/api', authJwtMiddleware as RequestHandler, wordPackRouter);

export default indexRouter;
