import WordPackModel, { IWordPackModel } from '../models/wordPackModel';

export default class WordPackRepository {
    static createWordPack(wordPack: IWordPackModel) {
        return WordPackModel.create(wordPack);
    }
    
    static getWordPack(wordPackId: string){
        
    }
}
