import jwt from "jsonwebtoken";

export class TokenService {
  private secret: string;

  // Define o segredo, ou retorna um erro caso não exista
  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret key is not defined!");
    }
    this.secret = process.env.JWT_SECRET;
  }

  // Gera o token, válido por 60 minutos
  generateToken(email: string): string {
    return jwt.sign({ email }, this.secret, { expiresIn: "60m" });
  }

  // Verifica se existe um token
  verifyToken(token: string): any {
    return jwt.verify(token, this.secret);
  }
}
