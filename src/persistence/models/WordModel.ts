import mongoose from 'mongoose';
import { IWord } from '../../domain/entities/Word';
import paginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

interface IWordDocument extends mongoose.Document, IWord {}

const wordSchema = new Schema<IWord>({
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
}, { timestamps: true });

wordSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

wordSchema.plugin(paginate);

export default mongoose.model<IWordDocument, mongoose.PaginateModel<IWordDocument>>('Word', wordSchema);
