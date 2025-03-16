import { AuthService } from "./authService";
import { EncryptionService } from "./encryptionService";
import { TokenService } from "./tokenService";
import { TransactionService } from "./transactionService";
import { UserService } from "./userService";

const tokenService = new TokenService();
const encryptionService = new EncryptionService();
const userService = new UserService();
const authService = new AuthService(
  userService,
  tokenService,
  encryptionService
);
const transactionService = new TransactionService(userService);

export {
  tokenService,
  encryptionService,
  userService,
  authService,
  transactionService
};
