export interface IWord {
  source: string;
  pos?: string;
  posTranslation?: string;
  translation: string;
}

export default class Word implements IWord {
  source;
  pos;
  posTranslation;
  translation;

  constructor(source: string, pos: string, posTranslation: string, translation: string) {
    this.source = source;
    this.pos = pos;
    this.posTranslation = posTranslation;
    this.translation = translation;
  }
}
