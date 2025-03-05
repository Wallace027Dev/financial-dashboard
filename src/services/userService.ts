import bcrypt from "bcryptjs";
import IUser from "@/interfaces/IUser";
import users from "@/mocks/users";

class UserService {
  async findById(id: number) {
    const user = await users.find((user: IUser) => user.id === Number(id));

    if (!user) {
      throw new Error("User not found");
    }
    // Pega o usuário pelo ID
    return user;
  }

  async findByEmail(email: string) {
    // Pega o usuário pelo email
    return users.find((user: IUser) => user.email === email);
  }

  async createUser(data: Partial<IUser>) {
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      name: data.name!,
      email: data.email!,
      password: hashedPassword,
      balance: 0.0,
      createdAt: new Date().toISOString().split("T")[0]
    };

    users.push(newUser);
    return newUser;
  }

  async validatePassword(
    inputPassword: string,
    userPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, userPassword);
  }
}

const userService = new UserService();
export default userService;
