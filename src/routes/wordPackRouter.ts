import express from 'express';
import WordPackController from '../controllers/WordPackController';

const wordRouter = express.Router();

wordRouter.get('/wordpack', WordPackController.getWordPack);
wordRouter.post('/wordpack', WordPackController.createWordPack);
wordRouter.put('/wordpack', WordPackController.updateWordPack);

export default wordRouter;
