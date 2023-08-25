import { NextFunction, Request, Response } from 'express';
import { ICustomRequest, UserPayload } from '../middlewares/authJwtMiddleware';
import WordPackService from '../../'
interface IWordPack {
  name: string,
  description: string,
  words: { 
    wordId: string 
  }[]

}

export default class WordPackController {
  static async getWordPack(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ status: 'getWordPack ok' });
    } catch (error) {
      return next(error);
    }
  }

  static async insertWordPack(req: Request, res: Response, next: NextFunction) {
    try {
      const { insertWordPackData }: { insertWordPackData: IWordPack } = req.body;
      const userPayload: UserPayload = (req as ICustomRequest).user;
      const word = await WordPackService.createWordPack(insertWordPackData);

      return res.json({ status: 'insertWordPack ok', insertWordPackData, userPayload });
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
