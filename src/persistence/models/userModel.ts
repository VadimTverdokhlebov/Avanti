import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IUserModel {
  _id: mongoose.Types.ObjectId;
  email: string;
  hashedPassword: string;
  firstName?: string;
  lastName?: string;
}

// const objectId = new mongoose.Types.ObjectId();

const userSchema = new Schema<IUserModel>({
  // _id: {
  //   type: mongoose.Types.ObjectId,
  //   default: () => new mongoose.Types.ObjectId(),
  // },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  hashedPassword: {
    type: String,
    unique: true,
    require: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
}, { timestamps: true });

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export default mongoose.model<IUserModel>('User', userSchema);