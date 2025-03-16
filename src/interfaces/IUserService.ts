import IUser from "./IUser";

export interface IUserService {
  findById(id: number): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  createUser(data: Partial<IUser>): Promise<IUser>;
  update(id: number, data: Partial<IUser>): Promise<IUser>;
  delete(id: number): Promise<void>;
}
