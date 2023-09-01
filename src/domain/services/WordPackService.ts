import WordPackRepository from '../../persistence/repositories/WordPackRepository';
import WordRepository from '../../persistence/repositories/WordRepository';
import WordService from './WordService';
import { UserPayload } from '../../application/middlewares/authJwtMiddleware';
import WordPack, { IWordPack } from '../entities/WordPack';
import UserRepository from '../../persistence/repositories/UserRepository';
import UserService from './UserService';
import ApiError from '../../exception/ApiError';

export interface IWordPackData {
  name: string,
  description: string,
  wordsId: string[]

}

export default class WordPackService {
  static async createWordPack(wordPackData: IWordPackData, userPayload: UserPayload) {
    const { email } = userPayload;
    const { name, description, wordsId } = wordPackData;
    const words = await WordRepository.getWords(wordsId);
    const userDataModel = await UserRepository.getUser(email);

    if (!userDataModel) {
      throw ApiError.badRequest('Error creating wordPack, the user not found!');
    }

    const { hashedPassword, firstName, lastName } = userDataModel;
    const userObj = UserService.createUser({ email, hashedPassword, firstName, lastName });

    const wordsArray = [];

    for (const word of words) {
      const { source, pos, posTranslation, translation } = word;
      wordsArray.push(WordService.createWord(source, translation, pos, posTranslation));
    }

    const wordPack = new WordPack(name, userObj, description, wordsArray);
    return wordPack;
  }

  static async saveWordPack(wordPack: IWordPack) {
    return WordPackRepository.createWordPack(wordPack);
  }
}