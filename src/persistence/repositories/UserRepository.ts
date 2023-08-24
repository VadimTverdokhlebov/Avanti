import UserModel from '../models/UserModel';
import { IUser } from '../../domain/entities/User';

export default class UserRepository {
  static createUser(user: IUser) {
    return UserModel.create(user);
  }

  static async checkEmailUser(email: string) {
    const user = await UserModel.find({ email });

    if (Array.isArray(user)) {
      return user.length;
    }

    return false;
  }

  static async getUser(email: string) {
    const user = await UserModel.find({ email });

    if (Array.isArray(user)) {
      return user[0];
    }

    return false;
  }
}
