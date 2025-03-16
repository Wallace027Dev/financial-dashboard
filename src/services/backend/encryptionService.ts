import bcrypt from "bcryptjs";

export class EncryptionService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async validatePassword(
    inputPassword: string,
    userPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, userPassword);
  }
}
