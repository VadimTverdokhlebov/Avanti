import express from 'express';
import WordPackController from '../controllers/WordPackController';

const wordPackRouter = express.Router();

wordPackRouter.get('/wordpack', WordPackController.getWordPack);
wordPackRouter.post('/wordpack', WordPackController.createWordPack);
wordPackRouter.put('/wordpack', WordPackController.updateWordPack);

export default wordPackRouter;
