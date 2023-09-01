import User, { IUser } from '../entities/User';

export default class UserService {
    static createUser({ email, hashedPassword, firstName, lastName }: IUser) {
        return new User(email, hashedPassword, firstName, lastName);
    }
}
