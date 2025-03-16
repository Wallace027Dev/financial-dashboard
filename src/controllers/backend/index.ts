import { authService, transactionService } from "@/services/backend";
import { AuthController } from "./authController";
import { TransactionController } from "./transactionController";

const authController = new AuthController(authService);
const transactionController = new TransactionController(transactionService);

export { authController, transactionController };
