import bcrypt from "bcryptjs";
import users from "@/mocks/users";
import { IUser, IUserDB } from "@/interfaces/IUser";

export class UserService {
  update(id: number, data: IUser): void {
    throw new Error("Method not implemented.");
  }

  delete(id: number): void {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<IUserDB> {
    const user = await users.find((user: IUserDB) => user.id === Number(id));

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findByEmail(email: string): Promise<IUserDB> {
    return users.find((user: IUser) => user.email === email);
  }

  async createUser(data: Partial<IUser>): Promise<IUserDB> {
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
