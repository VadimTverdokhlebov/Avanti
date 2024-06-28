import { NextFunction, Request, Response } from 'express';
import { ICustomRequest, UserPayload } from '../middlewares/authJwtMiddleware';
import WordPackService, { IPaginationSettings, IWordPackData } from '../services/WordPackService';

export default class WordPackController {
  static async getWordPack(req: Request, res: Response, next: NextFunction) {
    try {
      const paginationSettings: IPaginationSettings = req.body;
      const wordPacks = await WordPackService.paginateWordPacks(paginationSettings);
      return res.json({ status: 'getWordPack ok', wordPacks: wordPacks });
    } catch (error) {
      return next(error);
    }
  }

  static async insertWordPack(req: Request, res: Response, next: NextFunction) {
    try {
      const wordPackData: IWordPackData = req.body;
      const userPayload: UserPayload = (req as ICustomRequest).user;
      const wordPackModel = await WordPackService.saveWordPack(wordPackData, userPayload);
      return res.json({
        status: 'insertWordPack ok',
        userPayload,
        wordPackModel
      });
    } catch (error) {
      return next(error);
    }
  }

  static async updateWordPack(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ status: 'updateWordPack ok' });
    } catch (error) {
      return next(error);
    }
  }
}
