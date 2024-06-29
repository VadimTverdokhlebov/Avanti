import mongoose from 'mongoose';

export interface IUser {
  email: string;
  hashedPassword: string;
  firstName?: string;
  lastName?: string;
}
export interface IUserModel extends IUser {
  _id: mongoose.Types.ObjectId;
}

const { Schema } = mongoose;

const userSchema = new Schema<IUserModel>(
  {
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
  },
  { timestamps: true },
);

export default mongoose.model<IUserModel>('User', userSchema);
