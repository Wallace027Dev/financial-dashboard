import IUser from "./IUser";

export interface IAuthService {
  authenticate(data: Partial<IUser>): Promise<any>;
  validateData(data: Partial<IUser>): any;
  login(data: Partial<IUser>, user: IUser): Promise<any>;
  register(data: Partial<IUser>): Promise<any>;
}
