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
}

const userService = new UserService();
export default userService;
