import IUser from "@/interfaces/IUser";
import userZod from "@/utils/userZod";
import userService from "./userService";
import tokenService from "./tokenService";

class AuthService {
  async authenticate(data: Partial<IUser>) {
    if (!data.email) {
      throw new Error("Email is required");
    }
    // Valida o dado usando o ZOD
    const validatedUser = this.validateData(data);

    // Verifica se email já existe na tabela
    const user = await userService.findByEmail(validatedUser.email);

    // Se usuário já existir, retorna o usuário caso autenticado
    if (user) {
      return await this.login(validatedUser, user);
    }
    return await this.register(validatedUser);
  }

  private validateData(data: Partial<IUser>) {
    const result = userZod.safeParse(data);

    // Retorna o erro, caso não seja válido
    if (!result.success) {
      const errorMessage = result.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(errorMessage);
    }
    return result.data;
  }

  private async login(data: Partial<IUser>, user: IUser) {
    // Verificando se senhas conferem
    const isMatch = await userService.validatePassword(data.password!, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    // Criando token, caso autenticado
    const token = tokenService.generateToken(user.email);
    return  { user, token };
  }

  private async register(data: Partial<IUser>) {
    const newUser = await userService.createUser(data);
    const token = tokenService.generateToken(newUser.email);
    // Retorna o usuário depois de criado e o token
    return { user: newUser, token };
  }
}

const authService = new AuthService();
export default authService;
