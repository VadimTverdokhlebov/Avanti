import { IUser } from './User';
import { IWord } from './Word';

export interface IWordPack {
    name: string;
    user: IUser;
    description: string;
    words: IWord[];
}

export default class WordPack implements IWordPack {
    constructor(
        public name: string,
        public user: IUser,
        public description: string,
        public words: IWord[]
    ) {}
}
