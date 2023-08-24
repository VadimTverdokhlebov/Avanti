export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export default class User implements IUser {
  firstName;
  lastName;
  email;
  password;

  constructor(firstName: string, lastName: string, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}
