import WordPackModel from '../models/WordPackModel';

export default class WordPackRepository {
    static createWord() {
        return WordPackModel.create();
    }
}
