import WordPackRepository from '../../persistence/repositories/WordPackRepository';
import WordRepository from '../../persistence/repositories/WordRepository';
import WordService from './WordService';
import { UserPayload } from '../../middlewares/authJwtMiddleware';
import WordPack, { IWordPack } from '../entities/WordPack';
import UserRepository from '../../persistence/repositories/UserRepository';
import UserService from './UserService';
import ApiError from '../../exception/ApiError';
import { IWordPackModel } from '../../persistence/models/wordPackModel';
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
    static async createWordPack(wordPackData: IWordPackData, userPayload: UserPayload) {
        const { email } = userPayload;
        const { name, description, wordsId } = wordPackData;

        const userDataModel = await UserRepository.getUser(email);

        if (!userDataModel) {
            throw ApiError.badRequest('Error creating wordPack, the user not found!');
        }

        const { hashedPassword, firstName, lastName } = userDataModel;
        const user = UserService.createUser({
            email,
            hashedPassword,
            firstName,
            lastName
        });

        const words = await WordRepository.getWords(wordsId);
        const wordsArray = [];

        for (const word of words) {
            const { source, pos, posTranslation, translation } = word;
            wordsArray.push(WordService.createWord(source, translation, pos, posTranslation));
        }

        const wordPack = new WordPack(name, user, description, wordsArray);
        return wordPack;
    }

    static async saveWordPack(wordPack: IWordPack, wordPackData: IWordPackData) {
        const author = await UserRepository.getUser(wordPack.user.email);
        const { wordsId } = wordPackData;

        const words = wordsId.map(id => {
            return {
                word: new mongoose.Types.ObjectId(id)
            };
        });

        const wordPackModel: IWordPackModel = {
            name: wordPack.name,
            description: wordPack.description,
            author: new mongoose.Types.ObjectId(author?.id),
            authorFullName: `${author?.firstName} ${author?.lastName}`,
            words: words
        };

        return WordPackRepository.createWordPack(wordPackModel);
    }

    static async paginateWordPacks(paginationSettings: IPaginationSettings) {
        const { searchValue, page, limit } = paginationSettings;
        return WordPackRepository.getPaginateWordPacks(searchValue, page, limit);
    }
}
