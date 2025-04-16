import express from 'express';
import WordContriller from '../controllers/WordController';

const wordRouter = express.Router();

wordRouter.get('/word', WordContriller.getWord);
wordRouter.post('/word', WordContriller.insertWord);
wordRouter.put('/word', WordContriller.updateWord);

export default wordRouter;
