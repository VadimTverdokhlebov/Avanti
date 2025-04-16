import { NextFunction, Request, Response } from 'express';
import WordRepository, { IWordPaginationSettings, IWordData } from '../persistence/repositories/WordRepository';

export default class WordController {
  static async getWord(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const paginationSettings: IWordPaginationSettings = req.body;
      const result = await WordRepository.getPaginateWords(paginationSettings);

      res.json({ message: 'get words successfully', result });
    } catch (error) {
      next(error);
    }
  }

  static async insertWord(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const words: IWordData[] = req.body;
      const result = await WordRepository.insertManyWords(words);

      res.json({ message: 'word is written successfully', result });
    } catch (error) {
      next(error);
    }
  }

  static async updateWord(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({ message: 'word is updated successfully' });
    } catch (error) {
      next(error);
    }
  }
}
