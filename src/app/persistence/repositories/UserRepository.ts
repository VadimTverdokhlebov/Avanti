import UserModel from 'userModel';
import { IUserData } from 'UserService';
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
