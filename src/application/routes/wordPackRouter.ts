import express from 'express';
import WordPackContriller from '../controllers/WordPackController';

const wordRouter = express.Router();

wordRouter.get('/wordpack', WordPackContriller.getWordPack);
wordRouter.post('/wordpack', WordPackContriller.insertWordPack);
wordRouter.put('/wordpack', WordPackContriller.updateWordPack);

export default wordRouter;
