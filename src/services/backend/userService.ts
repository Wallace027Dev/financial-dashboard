import bcrypt from "bcryptjs";
import IUser from "@/interfaces/IUser";
import users from "@/mocks/users";
import { IUserService } from "@/interfaces/IUserService";

export class UserService implements IUserService {
  update(id: number, data: Partial<IUser>): Promise<IUser> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number) {
    const user = await users.find((user: IUser) => user.id === Number(id));

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findByEmail(email: string) {
    return users.find((user: IUser) => user.email === email);
  }

  async createUser(data: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name: data.name!,
      email: data.email!,
      password: hashedPassword,
      balance: 0.0,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null
    };

    users.push(newUser);
    return newUser;
  }
}
