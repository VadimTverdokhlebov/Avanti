import UserModel from '../models/userModel';
import { IUserData } from '../../services/UserService';
export default class UserRepository {
  static saveUser(userData: IUserData) {
    return UserModel.create(userData);
  }

  static getUser(email: string) {
    return UserModel.findOne({ email });
  }

  static getUsersByObjectID(ObjectsID: string[]) {
    return UserModel.find({ _id: { $in: ObjectsID } });
  }
}
