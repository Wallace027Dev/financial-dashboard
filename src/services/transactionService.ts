import ITransaction from "@/interfaces/ITransaction";
import authService from "./authService";

const transactions: any = [];

class TransactionService {
  async create(data: ITransaction) {
    const userExists = await authService.findById(data.userId);
    if (!userExists) {
      throw new Error("User not found");
    }

    if (!data.type) {
      throw new Error("Type not found");
    }

    if ((data.type !== "EXPENSE") && (data.type !== "RECIPE")) {
      throw new Error("Type is not valid");
    }

    if (!data.value) {
      throw new Error("Value not found");
    }

    if (!data.category) {
      throw new Error("Category not found");
    }

    const transaction = {
      type: data.type,
      value: data.value,
      category: data.category,
      userId: data.userId
    };
    transactions.push(transaction);

    console.log(transactions);
    return transaction;
  }
}

const transactionService = new TransactionService();
export default transactionService;
