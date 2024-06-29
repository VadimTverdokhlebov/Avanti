import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IWord {
  source: string;
  pos?: string;
  posTranslation?: string;
  translation: string;
}
export interface IWordModel extends IWord {}

const { Schema } = mongoose;

interface IWordDocument extends mongoose.Document, IWordModel {}

const wordSchema = new Schema<IWordDocument>(
  {
    source: {
      type: String,
      require: true,
    },
    pos: {
      type: String,
    },
    posTranslation: {
      type: String,
    },
    translation: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

wordSchema.plugin(paginate);

export default mongoose.model<IWordDocument, mongoose.PaginateModel<IWordDocument>>('Word', wordSchema);
