import { NextFunction, Request, Response } from 'express';
import WordService, { IPaginationSettings } from '../../domain/services/WordService';
import { IWord } from '../../domain/entities/Word';

export default class WordController {
  static async getWord(req: Request, res: Response, next: NextFunction) {
    try {
      const { paginationSettings }: { paginationSettings: IPaginationSettings } = req.body;
      const words = await WordService.paginateWord(paginationSettings);

      return res.json({ status: 'getWord ok', word: words, });
    } catch (error) {
      return next(error);
    }
  }

  static async insertWord(req: Request, res: Response, next: NextFunction) {
    try {
      const { insertWords }: { insertWords: IWord[] } = req.body;
      const word = await WordService.insertWords(insertWords);

      return res.json({ status: 'insertWord ok', word, });
    } catch (error) {
      return next(error);
    }
  }

  static async updateWord(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ status: 'updateWord ok' });
    } catch (error) {
      return next(error);
    }
  }
}
