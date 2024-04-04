export interface IWord {
    source: string;
    pos?: string;
    posTranslation?: string;
    translation: string;
}

export default class Word implements IWord {
    constructor(
        public source: string,
        public translation: string,
        public pos: string | undefined,
        public posTranslation: string | undefined
    ) {}
}
