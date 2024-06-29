import { NextFunction, Request, Response } from 'express';
import WordRepository, { IWordPaginationSettings, IWordData } from '../persistence/repositories/WordRepository';

export default class WordController {
  static async getWord(req: Request, res: Response, next: NextFunction) {
    try {
      const paginationSettings: IWordPaginationSettings = req.body;
      const result = await WordRepository.getPaginateWords(paginationSettings);

      return res.json({ message: 'get words successfully', result });
    } catch (error) {
      return next(error);
    }
  }

  static async insertWord(req: Request, res: Response, next: NextFunction) {
    try {
      const words: IWordData[] = req.body;
      const result = await WordRepository.insertManyWords(words);

      return res.json({ message: 'word is written successfully', result });
    } catch (error) {
      return next(error);
    }
  }

  static async updateWord(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ message: 'word is updated successfully' });
    } catch (error) {
      return next(error);
    }
  }
}
