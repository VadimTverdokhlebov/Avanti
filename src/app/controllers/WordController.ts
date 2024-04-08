import { NextFunction, Request, Response } from 'express';
import WordService, { IPaginationSettings, IWordData } from 'WordService';

export default class WordController {
    static async getWord(req: Request, res: Response, next: NextFunction) {
        try {
            const paginationSettings: IPaginationSettings = req.body;
            const words = await WordService.paginateWord(paginationSettings);

            return res.json({ status: 'getWord ok', word: words });
        } catch (error) {
            return next(error);
        }
    }

    static async insertWord(req: Request, res: Response, next: NextFunction) {
        try {
            const insertWords: IWordData[] = req.body;
            const word = await WordService.insertWords(insertWords);

            return res.json({ status: 'The word is written down', word });
        } catch (error) {
            return next(error);
        }
    }

    static async updateWord(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json({ status: 'The word has been updated' });
        } catch (error) {
            return next(error);
        }
    }
}
