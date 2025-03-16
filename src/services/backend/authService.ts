import { EncryptionService } from "./encryptionService";
import IUser from "@/interfaces/IUser";
import userZod from "@/utils/userZod";
import { TokenService } from "./tokenService";
import { UserService } from "./userService";
import { IAuthService } from "@/interfaces/IAuthService";

export class AuthService implements IAuthService {
  private userService: UserService;
  private tokenService: TokenService;
  private encryptionService: EncryptionService;
  constructor(
    userService: UserService,
    tokenService: TokenService,
    encryptionService: EncryptionService
  ) {
    this.userService = userService;
    this.tokenService = tokenService;
    this.encryptionService = encryptionService;
  }

  async authenticate(data: Partial<IUser>) {
    if (!data.email) {
      throw new Error("Email is required");
    }
    // Valida o dado usando o ZOD
    const validatedUser = this.validateData(data);

    // Verifica se email já existe na tabela
    const user = await this.userService.findByEmail(validatedUser.email);

    // Se usuário já existir, retorna o usuário caso autenticado
    if (user) {
      return await this.login(validatedUser, user);
    }
    return await this.register(validatedUser);
  }

  async login(data: Partial<IUser>, user: IUser) {
    // Verificando se senhas conferem
    const isMatch = await this.encryptionService.validatePassword(
      data.password!,
      user.password
    );
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    // Criando token, caso autenticado
    const token = this.tokenService.generateToken(user.email);
    return { user, token };
  }

  async register(data: Partial<IUser>) {
    const newUser = await this.userService.createUser(data);
    const token = this.tokenService.generateToken(newUser.email);
    // Retorna o usuário depois de criado e o token
    return { user: newUser, token };
  }

  validateData(data: Partial<IUser>) {
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
}
