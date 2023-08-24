import express from 'express';
import authRouter from './authRouter';
import wordRouter from './wordRouter';
import wordPackRouter from './wordPackRouter';

const indexRouter = express.Router();

indexRouter.use('/api', authRouter);
indexRouter.use('/api', wordRouter);
indexRouter.use('/api', wordPackRouter);

export default indexRouter;
