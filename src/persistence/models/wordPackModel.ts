import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
interface IWords {
    word: mongoose.Types.ObjectId;
}

export interface IWordPackModel {
    name: string;
    description?: string;
    authorFullName?: string;
    author: mongoose.Types.ObjectId;
    words: Array<IWords>;
}

const { Schema } = mongoose;

interface IWordPackDocument extends mongoose.Document, IWordPackModel {}

const wordPackSchema = new Schema<IWordPackModel>(
    {
        name: {
            type: String,
            require: true
        },
        description: {
            type: String
        },
        authorFullName: {
            type: String
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        words: [
            new Schema({
                word: {
                    type: Schema.Types.ObjectId,
                    ref: 'Word'
                }
            })
        ]
    },
    { timestamps: true }
);

wordPackSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

wordPackSchema.plugin(paginate);

export default mongoose.model<IWordPackModel, mongoose.PaginateModel<IWordPackDocument>>('WordPack', wordPackSchema);
