import { NextRequest } from "next/server";
import IUser from "./IUser";

export interface IAuthService {
  authenticate(req: NextRequest): Promise<any>;
  findById(id: number): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  createUser(data: Partial<IUser>): Promise<IUser>;
  update(id: number, data: Partial<IUser>): Promise<IUser>;
  delete(id: number): Promise<void>;
  validatePassword(
    inputPassword: string,
    userPassword: string
  ): Promise<boolean>;
}
