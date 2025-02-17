import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";

import IUser from "@/interfaces/IUser";
import userZod from "@/utils/userZod";

const users: any = [];

class AuthService {
  async authenticate(data: Partial<IUser>) {
    // Verifica se email já existe na tabela
    const userExists = await this.findByEmail(data.email!);

    // Se usuário já existir, retorna o usuário caso autenticado
    if (userExists) {
      return await this.login(data, userExists);
    }

    // Registra o usuário, caso não exista
    return this.register(data);
  }

  async validateData(data: Partial<IUser>) {
    // Valida o dado usando ZOD
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

  async findByEmail(email: string) {
    // Pega o usuário pelo ID
    return users.find((user: IUser) => user.email == email);
  }

  async login(data: Partial<IUser>, user: IUser) {
    // Verifica se o dado é válido
    const validatedUser = await this.validateData(data);

    // Verificando se senhas conferem
    const isMatch = await bcrypt.compare(validatedUser.password, user.password);
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    // Criando token, caso autenticado
    const token = await this.generateToken(validatedUser.email);

    return { data: { user, token } };
  }

  async register(data: Partial<IUser>) {
    // Verifica se o dado é válido
    const validatedUser = await this.validateData(data);

    // Criando hash de senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedUser.password, salt);

    // Criando objeto do novo usuário
    const newUser = {
      id: Math.round(1000 * Math.random()),
      name: validatedUser.name,
      email: validatedUser.email,
      password: hashedPassword,
      createdAt: new Date(Date.now())
    };

    // Adicionando novo usuário na tabela
    users.push(newUser);
    // Log da lista de usuários
    console.log(users);

    // Gerando token
    const token = await this.generateToken(newUser.email);

    return { user: newUser, token };
  }

  async generateToken(email: string) {
    // Verifica se existe uma chave privada
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) throw new Error("Private key is not defined!");

    return jsonwebtoken.sign({ email: email }, privateKey, {
      expiresIn: "60m"
    });
  }
}

const authService = new AuthService();
export default authService;
