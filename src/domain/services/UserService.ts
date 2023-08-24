import User from '../entities/User';

export default class UserService {
    static createUser(firstName : string, lastName: string, email: string, hashPassword: string) {
        const user = new User(firstName, lastName, email, hashPassword);
        return user;
    }
}
