export interface IUserData {
    email: string;
    hashedPassword: string;
    firstName: string;
    lastName: string;
}

export default class UserService {
    static saveUser(userData: IUserData) {
        return userData;
    }
}
