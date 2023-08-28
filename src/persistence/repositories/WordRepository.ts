import mongoose from 'mongoose';
import WordModel from '../models/wordModel';
import { IWord } from '../../domain/entities/Word';

export interface ISearchValue {
    source?: string;

    pos?: string;

    posTranslation?: string;

    translation?: string;
}

export default class WordRepository {
    static createWord(word: IWord) {
        return WordModel.create(word);
    }

    static insertManyWords(words: IWord[]) {
        return WordModel.insertMany(words);
    }

    static deleteAllWords() {
        return WordModel.deleteMany({});
    }

    static getAllWords() {
        return WordModel.find().all('words', []);
    }

    static getWords(wordsId: string[]) {
        return WordModel.find({ _id: { $in: wordsId } });
    }

    static getWord(source: string) {
        const regexp = new RegExp(source.trim(), 'i');
        return WordModel.find({ source: regexp });
    }

    static getPaginateWords(searchValue: ISearchValue, page: number, limit: number) {

        interface IQueryPaginate {
            source?: RegExp;

            pos?: RegExp;

            posTranslation?: RegExp;

            translation?: RegExp;
        }

        const options: mongoose.PaginateOptions = {
            page,
            limit,
        };


        const query: IQueryPaginate = {};

        if (searchValue.source) {
            const sourceRegexp = new RegExp(searchValue.source.trim(), 'i');
            query.source = sourceRegexp;
        }

        if (searchValue.pos) {
            const posRegexp = new RegExp(searchValue.pos.trim(), 'i');
            query.pos = posRegexp;
        }

        if (searchValue.posTranslation) {
            const posTranslationRegexp = new RegExp(searchValue.posTranslation.trim(), 'i');
            query.posTranslation = posTranslationRegexp;
        }

        if (searchValue.translation) {
            const translationRegexp = new RegExp(searchValue.translation.trim(), 'i');
            query.translation = translationRegexp;
        }

        return WordModel.paginate(query, options);
    }

}
