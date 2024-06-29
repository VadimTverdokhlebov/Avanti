import UserModel, { IUser } from '../models/userModel';
export default class UserRepository {
  static saveUser(userData: IUser) {
    return UserModel.create(userData);
  }

  static getUser(email: string) {
    return UserModel.findOne({ email });
  }

  static getUsersByObjectID(ObjectsId: string[]) {
    return UserModel.find({ _id: { $in: ObjectsId } });
  }
}
