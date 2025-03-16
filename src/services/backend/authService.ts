import { EncryptionService } from "./encryptionService";
import userZod from "@/utils/userZod";
import { TokenService } from "./tokenService";
import { UserService } from "./userService";
import { IUser, IUserBase, IUserDB } from "@/interfaces/IUser";

export class AuthService {
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

  async authenticate(data: IUserBase): Promise<{ user: IUser; token: string }> {
    this.validateEmail(data.email);

    // Valida os dados de entrada
    const validatedUser = this.validateData(data);

    // Verifica se o usuário já existe no banco
    const user = await this.userService.findByEmail(validatedUser.email);

    // Se o usuário existe, faz o login, caso contrário, registra o novo usuário
    if (user) {
      return this.login(validatedUser, user);
    }

    return this.register(validatedUser);
  }

  private async login(
    data: IUserBase,
    user: IUserDB
  ): Promise<{ user: IUserDB; token: string }> {
    // Verifica se a senha fornecida confere com a armazenada no banco
    const isMatch = await this.encryptionService.validatePassword(
      data.password!,
      user.password
    );
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    // Gera um token para o usuário autenticado
    const token = this.generateToken(user.email);
    return { user, token };
  }

  private async register(data: IUserBase): Promise<{ user: IUser; token: string }> {
    const newUser = await this.userService.createUser(data);
    const token = this.generateToken(newUser.email);

    return { user: newUser, token };
  }

  private validateData(data: IUserBase): IUserBase {
    const result = userZod.safeParse(data);

    // Se a validação falhar, lança um erro com a mensagem detalhada
    if (!result.success) {
      const errorMessage = result.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(errorMessage);
    }

    return result.data;
  }

  private validateEmail(email: string): void {
    if (!email) {
      throw new Error("Email is required");
    }
  }

  private generateToken(email: string): string {
    return this.tokenService.generateToken(email);
  }
}
