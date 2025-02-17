import { NextRequest } from "next/server";
import transactionService from "@/services/transactionService";

class TransactionController {
  async create(data: NextRequest) {
    try {
      const transaction = await data.json();

      return transactionService.create(transaction);
    } catch (error: any) {
      return error.message;
    }
  }
}

const transactionController = new TransactionController();
export default transactionController;
