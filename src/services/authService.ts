import jsonwebtoken from "jsonwebtoken";

import IUser from "@/interfaces/IUser";
import bcrypt from "bcryptjs";

const users: any = [];

async function authService(data: Partial<IUser>) {
  try {
    // Verifica se email já existe na tabela
    const userExists = users.find((user: IUser) => user.email == data.email);

    if (!data.password) {
      throw new Error("A senha não foi passada!");
    }
    const salt = await bcrypt.genSalt(10); // Salt de 10 rounds, ajustável

    // Se usuário já existir, retorna o usuário caso autenticado
    if (userExists) {
      const privateKey = process.env.PRIVITE_KEY;
      if (!privateKey) {
        throw new Error("Chave privada não encontrada!");
      }

      // Verificando se senhas conferem
      const isMatch = await bcrypt.compare(data.password, userExists.password);
      if (!isMatch) {
        throw new Error("Senha não confere!");
      }

      // Criando token, caso autenticado
      const token = jsonwebtoken.sign(
        { email: JSON.stringify(data.email) },
        privateKey,
        { expiresIn: "60m" }
      );

      return { data: { userExists, token } };
    }

    // Criando hash de senha
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Criando objeto do novo usuário
    const newUser = {
      id: Math.round(1000 * Math.random()),
      name: data.name,
      email: data.email,
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

export default authService;
