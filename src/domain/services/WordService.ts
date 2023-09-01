import Word from '../entities/Word';
import { IWord } from '../entities/Word';
import WordRepository from '../../persistence/repositories/WordRepository';

export interface IPaginationSettings {
    searchValue: {
        source?: string;

        pos?: string;

        posTranslation?: string;

        translation?: string;
    },
    page: number,
    limit: number
}

export default class WordService {
    static createWord(source: string, translation: string, pos: string | undefined, posTranslation: string | undefined) {
        const word = new Word(source, translation, pos, posTranslation);
        return word;
    }

    static paginateWord(paginationSettings: IPaginationSettings) {
        const { searchValue, page, limit } = paginationSettings;
        return WordRepository.getPaginateWords(searchValue, page, limit);
    }

    static insertWords(insertWords: IWord[]) {
        return WordRepository.insertManyWords(insertWords);
    }

}
