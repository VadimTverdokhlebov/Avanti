import express from 'express';
import authRouter from './authRouter';
import wordRouter from './wordRouter';
import wordPackRouter from './wordPackRouter';
import authJwtMiddleware from '../middlewares/authJwtMiddleware';

const indexRouter = express.Router();

indexRouter.use('/api', authRouter);
indexRouter.use('/api', authJwtMiddleware, wordRouter);
indexRouter.use('/api', authJwtMiddleware,  wordPackRouter);

export default indexRouter;
