import { NextFunction, Request, Response } from 'express';

export default class WordPackController {
  static async getWordPack(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ status: 'getWordPack ok', });
    } catch (error) {
      return next(error);
    }
  }

  static async insertWordPack(req: Request, res: Response, next: NextFunction) {
    try {
      return res.json({ status: 'insertWordPack ok', });
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
