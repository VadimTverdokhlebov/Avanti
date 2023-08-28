import User, { IUser } from "./User"
export interface IWordPack {
    name: string,
    user: IUser,
    description: string,
    
}

export default class WordPack implements IWordPack {

    constructor() {
    }
}
