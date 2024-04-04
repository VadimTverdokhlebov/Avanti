import mongoose from 'mongoose';
import WordPackModel, { IWordPackModel } from '../models/wordPackModel';

export interface ISearchValue {
    authorFullName?: string;

    name?: string;

    description?: string;
}
export default class WordPackRepository {
    static createWordPack(wordPack: IWordPackModel) {
        return WordPackModel.create(wordPack);
    }

    static getWordPack(wordPackId: string) {}

    static getPaginateWordPacks(searchValue: ISearchValue, page: number, limit: number) {
        interface IQueryPaginate {
            authorFullName?: RegExp;

            name?: RegExp;

            description?: RegExp;
        }

        const options: mongoose.PaginateOptions = {
            populate: [
                {
                    path: 'author',
                    select: 'email firstName lastName'
                },
                {
                    path: 'words.word',
                    select: 'source pos posTranslation translation'
                }
            ],
            select: 'name authorFullName description',
            page,
            limit
        };

        const query: IQueryPaginate = {};

        if (searchValue.authorFullName) {
            const sourceRegexp = new RegExp(searchValue.authorFullName.trim(), 'i');
            query.authorFullName = sourceRegexp;
        }

        if (searchValue.name) {
            const posRegexp = new RegExp(searchValue.name.trim(), 'i');
            query.name = posRegexp;
        }

        if (searchValue.description) {
            const posTranslationRegexp = new RegExp(searchValue.description.trim(), 'i');
            query.description = posTranslationRegexp;
        }

        return WordPackModel.paginate(query, options);
    }
}
