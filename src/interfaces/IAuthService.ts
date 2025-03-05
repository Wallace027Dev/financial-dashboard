import IUser from "./IUser";

export interface IAuthService {
  authenticate(data: Partial<IUser>): Promise<{ user: IUser; token: string }>;
}
