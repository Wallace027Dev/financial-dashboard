import IUser from "./IUser";

export interface IUserService {
  findById(id: number): Promise<IUser | null>;
  create(data: IUser): Promise<IUser>;
  update(id: number, data: Partial<IUser>): Promise<IUser>;
  delete(id: number): Promise<void>;
}
