import jsonwebtoken from "jsonwebtoken";

import IUser from "@/interfaces/IUser";

const users: any = [];

async function authService(data: Partial<IUser>) {
  try {
    // Verifica se email já existe na tabela
    const userExists = users.find((user: IUser) => user.email == data.email);

    // Se usuário já existir, retorna o usuário caso autenticado
    if (userExists) {
      const privateKey = process.env.PRIVITE_KEY;
      if (!privateKey) {
        throw new Error("Chave privada não encontrada!");
      }

      const token = jsonwebtoken.sign(
        { email: JSON.stringify(data.email) },
        privateKey,
        { expiresIn: "60m" }
      );

      return { data: { userExists, token } };
    }

    // Criando objeto do novo usuário
    const newUser = {
      id: Math.round(1000 * Math.random()),
      name: data.name,
      email: data.email,
      password: data.password,
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
