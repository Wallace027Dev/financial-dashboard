import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.PRIVATE_KEY!;

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
