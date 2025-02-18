import ITransaction from "@/interfaces/ITransaction";
import ITransactionFilters from "@/interfaces/ITransactionFilters";
import IUser from "@/interfaces/IUser";
import userService from "./userService";
import users from "@/mocks/users";
import transactions from "@/mocks/transaction";
import transactionZod from "@/utils/transactionZod";

class TransactionService {
  private async updateUserBalance(
    userId: number,
    transactionValue: number,
    type: "RECIPE" | "EXPENSE"
  ) {
    const user = await userService.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (type === "EXPENSE") {
      user.balance -= transactionValue;
    } else if (type === "RECIPE") {
      user.balance += transactionValue;
    }

    const userIndex = users.findIndex((u: IUser) => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = user;
    }

    return user;
  }

  async validateData(data: Partial<ITransaction>) {
    // Valida o dado usando ZOD
    const result = transactionZod.safeParse(data);

    // Retorna o erro, caso não seja válido
    if (!result.success) {
      const errorMessage = result.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");

      throw new Error(errorMessage);
    }

    result.data;
  }

  async listAll(filters: ITransactionFilters) {
    let filteredTransactions = transactions;

    // Filtro por categoria
    if (filters.category) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: ITransaction) => transaction.category === filters.category
      );
    }

    // Filtro por tipo (RECIPE ou EXPENSE)
    if (filters.type) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: ITransaction) => transaction.type === filters.type
      );
    }

    // Filtro por userId
    if (filters.userId) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: ITransaction) => transaction.userId === filters.userId
      );
    }

    // Filtro por valor (minValue e maxValue)
    if (filters.minValue) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: ITransaction) => transaction.value >= filters.minValue!
      );
    }

    if (filters.maxValue) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: ITransaction) => transaction.value <= filters.maxValue!
      );
    }

    // Filtro por data (minDate e maxDate)
    if (filters.minDate) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: ITransaction) =>
          new Date(transaction.createdAt) >= filters.minDate!
      );
    }

    if (filters.maxDate) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: ITransaction) =>
          new Date(transaction.createdAt) <= filters.maxDate!
      );
    }

    // Trazendo transações que não sofreram Soft Delete
    filteredTransactions = filteredTransactions.filter(
      (transaction: ITransaction) => !transaction.deletedAt
    );

    // Retorna as transações filtradas ou todas as transações se nenhum filtro foi aplicado
    return filteredTransactions;
  }

  async findById(id: number) {
    const transaction = transactions.find(
      (transaction: ITransaction) => transaction.id === id
    );

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return transaction;
  }

  async create(data: ITransaction) {
    await this.validateData(data);

    await this.updateUserBalance(data.userId, data.value, data.type);

    const transaction = {
      id: Math.round(1000 * Math.random()),
      type: data.type,
      value: data.value,
      category: data.category,
      userId: data.userId,
      createdAt: new Date().toISOString().split("T")[0]
    };

    transactions.push(transaction);
    return transaction;
  }

  async update(data: Partial<ITransaction>) {
    const transaction = await this.findById(data.id!);

    const updatedTransaction = {
      ...transaction,
      ...data,
      updatedAt: new Date().toISOString().split("T")[0]
    };

    const index = transactions.findIndex(
      (transaction: ITransaction) => transaction.id === data.id
    );
    if (index !== -1) {
      transactions[index] = updatedTransaction;
    }

    return updatedTransaction;
  }

  async delete(id: number) {
    const transaction = await this.findById(id);

    const updatedTransaction = {
      ...transaction,
      deletedAt: new Date().toISOString().split("T")[0]
    };

    await this.updateUserBalance(
      transaction.userId,
      transaction.value,
      transaction.type
    );

    const transactionIndex = transactions.findIndex(
      (transaction: ITransaction) => transaction.id === id
    );
    if (transactionIndex !== -1) {
      transactions[transactionIndex] = updatedTransaction;
    }

    return updatedTransaction;
  }
}

const transactionService = new TransactionService();
export default transactionService;
