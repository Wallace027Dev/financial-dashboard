import IUser from "./IUser";

export interface IAuthenticate {
  authenticate(data: Partial<IUser>): Promise<{ user: IUser; token: string }>;
}
