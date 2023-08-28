import WordPackRepository from '../../persistence/repositories/WordPackRepository';
import WordRepository from '../../persistence/repositories/WordRepository';
import WordService from './WordService';
import { UserPayload } from '../../application/middlewares/authJwtMiddleware';
import WordPack from '../entities/WordPack';

export interface IWordPackData {
  name: string,
  description: string,
  wordsId: string[]

}

export default class WordPackService {
  static async createWordPack(wordPackData: IWordPackData, userPayload: UserPayload) {
    const { userId, email } = userPayload;
    const { name, description, wordsId } = wordPackData;
    const words = await WordRepository.getWords(wordsId);
    const wordsArray = [];
    for (const word of words) {
      const { source, pos, posTranslation, translation } = word;
      wordsArray.push(WordService.createWord(source, pos, posTranslation, translation));
    }
    const wordPack = new WordPack(name, description, );
    return wordPack;
  }
}