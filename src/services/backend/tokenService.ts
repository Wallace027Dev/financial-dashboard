import jwt, { JwtPayload } from "jsonwebtoken";

export class TokenService {
  private secret: string;
  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret key is not defined!");
    }
    this.secret = process.env.JWT_SECRET;
  }

  generateToken(email: string): string {
    return jwt.sign({ email }, this.secret, { expiresIn: "60m" });
  }

  verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, this.secret);
  }
}
