import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";

import IUser from "@/interfaces/IUser";

const users: any = [];

class AuthService {
  async validateData(data: Partial<IUser>) {
    const user = z.object({
      name: z
        .string({
          required_error: "Name is required",
          invalid_type_error: "Name must be a string"
        })
        .min(3, {
          message: "Must be a 3 or more characters long"
        }),
      email: z
        .string({
          required_error: "Email is required",
          invalid_type_error: "Email must be a string"
        })
        .email(),
      password: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be a string"
        })
        .min(6, {
          message: "Must be a 6 or more characters long"
        })
    });

    const result = user.safeParse(data);

    if (!result.success) {
      const errorMessage = result.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");
      throw new Error(errorMessage);
    }

    return result.data;
  }

  async authenticate(data: Partial<IUser>) {
    const salt = await bcrypt.genSalt(10); // Salt de 10 rounds, ajustável

    try {
      // Verifica se email já existe na tabela
      const userExists = users.find((user: IUser) => user.email == data.email);

      // Se usuário já existir, retorna o usuário caso autenticado
      if (userExists) {
        const privateKey = process.env.PRIVATE_KEY;
        if (!privateKey) {
          throw new Error("Chave privada não encontrada!");
        }

        if (!data.password) {
          throw new Error("Senha não informada");
        }

        // Verificando se senhas conferem
        const isMatch = await bcrypt.compare(
          data.password,
          userExists.password
        );
        if (!isMatch) {
          throw new Error("Senha não confere!");
        }

        // Criando token, caso autenticado
        const token = jsonwebtoken.sign({ email: data.email }, privateKey, {
          expiresIn: "60m"
        });

        return { data: { userExists, token } };
      }

      const validatedUser = await this.validateData(data);

      // Criando hash de senha
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

      return newUser;
    } catch (error: any) {
      return error.message;
    }
  }
}

const authService = new AuthService();
export default authService;
