import { IWordPack } from '../../domain/entities/WordPack';
import WordPackModel from '../models/wordPackModel';

export default class WordPackRepository {
    static createWordPack(wordPack: IWordPack) {
        return WordPackModel.create(wordPack);
    }
}
