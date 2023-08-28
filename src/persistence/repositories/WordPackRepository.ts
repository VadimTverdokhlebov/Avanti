import WordPackModel from '../models/wordPackModel';

export default class WordPackRepository {
    static createWord() {
        return WordPackModel.create();
    }
}
