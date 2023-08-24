import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IWords {
  word: mongoose.Types.ObjectId;
}

interface IWordPack {
  name: string;
  description?: string;
  author: mongoose.Types.ObjectId;
  words: Array<IWords>;

}

const wordPackSchema = new Schema<IWordPack>({
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

export default mongoose.model<IWordPack>('WordPack', wordPackSchema);