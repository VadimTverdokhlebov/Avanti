import { NextFunction, Request, Response } from 'express';
import { ICustomRequest, UserPayload } from '../middlewares/authJwtMiddleware';
import WordPackRepository from '../persistence/repositories/WordPackRepository';
import UserRepository from '../persistence/repositories/UserRepository';
import ApiError from '../exception/ApiError';
import WordRepository from '../persistence/repositories/WordRepository';
import mongoose from 'mongoose';
import { IWordPackModel } from '../persistence/models/wordPackModel';
export interface IWordPackData {
  name: string;
  description: string;
  wordsId: string[];
}

export interface IPaginationSettings {
  searchValue: {
    author?: string;
    name?: string;
    description?: string;
  };
  page: number;
  limit: number;
}
export default class WordPackController {
  static async getWordPack(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { searchValue, page, limit }: IPaginationSettings = req.body;
      const result = await WordPackRepository.getPaginateWordPacks(searchValue, page, limit);
      res.json({ status: 'get word pack successfully', result });
    } catch (error) {
      next(error);
    }
  }

  static async createWordPack(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, description, wordsId }: IWordPackData = req.body;
      const { email }: UserPayload = (req as ICustomRequest).user;
      const userDataModel = await UserRepository.getUser(email);

      if (!userDataModel) {
        throw ApiError.badRequest('Error creating wordPack, the user not found!');
      }

      const wordsDataModel = await WordRepository.getWords(wordsId);

      if (!wordsDataModel.length) {
        throw ApiError.badRequest('Error creating wordPack, the words not found!');
      }

      const words = wordsDataModel.map(word => {
        return {
          word: new mongoose.Types.ObjectId(String(word._id)),
        };
      });

      const wordPackModel: IWordPackModel = {
        name: name,
        description: description,
        author: new mongoose.Types.ObjectId(String(userDataModel?.id)),
        authorFullName: `${userDataModel?.firstName} ${userDataModel?.lastName}`,
        words: words,
      };

      const result = await WordPackRepository.createWordPack(wordPackModel);

      res.json({ status: 'create word pack successfully', result });
    } catch (error) {
      next(error);
    }
  }

  static async updateWordPack(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({ status: 'update word pack successfully' });
    } catch (error) {
      next(error);
    }
  }
}
