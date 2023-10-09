import mongoose from 'mongoose';

interface IWords {
  word: mongoose.Types.ObjectId;
}

export interface IWordPackModel {
  name: string;
  description?: string;
  author: mongoose.Types.ObjectId;
  words: Array<IWords>;  
}

const { Schema } = mongoose;

const wordPackSchema = new Schema<IWordPackModel>({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  words: [
    new Schema({
      word: {
        type: Schema.Types.ObjectId,
        ref: 'Word',
      },
    })],
}, { timestamps: true });

wordPackSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export default mongoose.model<IWordPackModel>('WordPack', wordPackSchema);