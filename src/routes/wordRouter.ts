import express, { RequestHandler } from 'express';
import WordContriller from '../controllers/WordController';

const wordRouter = express.Router();

wordRouter.get('/word', WordContriller.getWord as RequestHandler);
wordRouter.post('/word', WordContriller.insertWord as RequestHandler);
wordRouter.put('/word', WordContriller.updateWord as RequestHandler);

export default wordRouter;
