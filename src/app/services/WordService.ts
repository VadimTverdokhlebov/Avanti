import WordRepository from 'WordRepository';

export interface IPaginationSettings {
    searchValue: {
        source?: string;

        pos?: string;

        posTranslation?: string;

        translation?: string;
    };
    page: number;
    limit: number;
}
export interface IWordData {
    source: string;
    pos?: string;
    posTranslation?: string;
    translation: string;
}

export default class WordService {
    static paginateWord(paginationSettings: IPaginationSettings) {
        const { searchValue, page, limit } = paginationSettings;
        return WordRepository.getPaginateWords(searchValue, page, limit);
    }

    static insertWords(insertWords: IWordData[]) {
        return WordRepository.insertManyWords(insertWords);
    }
}
