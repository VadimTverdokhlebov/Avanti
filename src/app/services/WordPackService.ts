import WordPackRepository from 'WordPackRepository';
import WordRepository from 'WordRepository';
import { UserPayload } from '../middlewares/authJwtMiddleware';
import UserRepository from 'UserRepository';
import ApiError from '../../exception/ApiError';
import { IWordPackModel } from 'wordPackModel';
import mongoose from 'mongoose';

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

export default class WordPackService {
    static async saveWordPack(wordPackData: IWordPackData, userPayload: UserPayload) {
        const { email } = userPayload;
        const { name, description, wordsId } = wordPackData;
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
                word: new mongoose.Types.ObjectId(word._id)
            };
        });

        const wordPackModel: IWordPackModel = {
            name: name,
            description: description,
            author: new mongoose.Types.ObjectId(userDataModel?.id),
            authorFullName: `${userDataModel?.firstName} ${userDataModel?.lastName}`,
            words: words
        };

        return WordPackRepository.createWordPack(wordPackModel);
    }

    static async paginateWordPacks(paginationSettings: IPaginationSettings) {
        const { searchValue, page, limit } = paginationSettings;
        return WordPackRepository.getPaginateWordPacks(searchValue, page, limit);
    }
}
