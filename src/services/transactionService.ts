import ITransaction from "@/interfaces/ITransaction";
import ITransactionFilters from "@/interfaces/ITransactionFilters";
import { ITransactionService } from "@/interfaces/ITransactionService";
import { IUserService } from "@/interfaces/IUserService";
import transactions from "@/mocks/transaction";
import transactionZod from "@/utils/transactionZod";

class TransactionService implements ITransactionService {
  constructor(private userService: IUserService) {}

  private async updateUserBalance(
    userId: number,
    transactionValue: number,
    type: "RECIPE" | "EXPENSE"
  ) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.balance += type === "RECIPE" ? transactionValue : -transactionValue;
    return user;
  }

  async validateData(data: Partial<ITransaction>) {
    const result = transactionZod.safeParse(data);
    if (!result.success) {
      throw new Error(result.error.format().toString());
    }
  }

  async listAll(f: ITransactionFilters) {
    return transactions.filter(
      (t: ITransaction) =>
        (!f.category || t.category === f.category) &&
        (!f.type || t.type === f.type) &&
        (!f.userId || t.userId === f.userId) &&
        (!f.minValue || t.value >= f.minValue) &&
        (!f.maxValue || t.value <= f.maxValue) &&
        (!f.minDate || new Date(t.createdAt) >= f.minDate) &&
        (!f.maxDate || new Date(t.createdAt) <= f.maxDate) &&
        !t.deletedAt
    );
  }

  async findById(id: number) {
    const transaction = transactions.find((t: ITransaction) => t.id === id);
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  }

  async create(data: ITransaction) {
    await this.validateData(data);
    await this.updateUserBalance(data.userId, data.value, data.type);
    const transaction = {
      ...data,
      id: Date.now(),
      createdAt: new Date()
    };
    transactions.push(transaction);
    return transaction;
  }

  async update(data: Partial<ITransaction>) {
    const transaction = await this.findById(data.id!);
    Object.assign(transaction, data, { updatedAt: new Date() });
    return transaction;
  }

  async delete(id: number) {
    const transaction = await this.findById(id);

    await this.updateUserBalance(
      transaction.userId,
      transaction.value,
      transaction.type
    );
    transaction.deletedAt = new Date();

    return transaction;
  }
}

export default TransactionService;
