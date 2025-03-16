export interface IUserBase {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends IUserBase {
  balance: number;
  /*
  name: string;
  email: string;
  password: string;
  */
}

export interface IAuthenticatedUser extends IUserBase {
  token: string;
  /*
  name: string;
  email: string;
  password: string;
  */
}

export interface IUserDB extends IUser {
  id: number;
  /*
  balance: number;
  name: string;
  email: string;
  password: string;
  */
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
