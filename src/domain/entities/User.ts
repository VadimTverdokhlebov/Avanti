export interface IUser { 
  email: string;
  hashedPassword: string;
  firstName?: string;
  lastName?: string;
}

export default class User implements IUser {
  constructor(
    public email: string,
    public hashedPassword: string,
    public firstName?: string | undefined,
    public lastName?: string | undefined,
  ) {}
}
