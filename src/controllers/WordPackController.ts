import { NextFunction, Request, Response } from 'express';
import { ICustomRequest, UserPayload } from '../middlewares/authJwtMiddleware';
import WordPackService, { IPaginationSettings, IWordPackData } from '../domain/services/WordPackService';

export default class WordPackController {
  static async getWordPack(req: Request, res: Response, next: NextFunction) {
    try {
      const { paginationSettings }: { paginationSettings: IPaginationSettings } = req.body;
      const wordPacks = await WordPackService.paginateWordPacks(paginationSettings); 
      return res.json({ status: 'getWordPack ok', wordPacks: wordPacks });
    } catch (error) {
      return next(error);
    }
  }

  static async insertWordPack(req: Request, res: Response, next: NextFunction) {
    try {
      const { insertWordPackData }:  { insertWordPackData: IWordPackData } = req.body;
      const userPayload: UserPayload = (req as ICustomRequest).user;
      const wordPack = await WordPackService.createWordPack(insertWordPackData, userPayload);
      const wordPackModel = await WordPackService.saveWordPack(wordPack, insertWordPackData);
      return res.json({ status: 'insertWordPack ok', wordPack, userPayload, wordPackModel });
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
