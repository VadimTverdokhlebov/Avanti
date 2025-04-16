import express, { RequestHandler } from 'express';
import WordPackController from '../controllers/WordPackController';

const wordRouter = express.Router();

wordRouter.get('/wordpack', WordPackController.getWordPack as RequestHandler);
wordRouter.post('/wordpack', WordPackController.createWordPack as RequestHandler);
wordRouter.put('/wordpack', WordPackController.updateWordPack as RequestHandler);

export default wordRouter;
