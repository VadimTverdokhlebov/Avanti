import UserModel from '../models/userModel';
import { IUser } from '../../domain/entities/User';

export default class UserRepository {
  static createUser(user: IUser) {
    return UserModel.create(user);
  }

  static getUser(email: string) {
    return UserModel.findOne({ email });
  }

  static getUsersByObjectID(ObjectsID: string[]) {
    return UserModel.find({ _id: { $in: ObjectsID } });
}
}
