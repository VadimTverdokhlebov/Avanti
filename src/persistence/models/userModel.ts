import mongoose from 'mongoose';
import { IUser } from '../../domain/entities/User';

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
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

export default mongoose.model<IUser>('User', userSchema);