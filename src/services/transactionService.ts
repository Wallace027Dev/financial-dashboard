import ITransaction from "@/interfaces/ITransaction";
import transactionZod from "@/utils/transactionZod";
import userService from "./userService";
import transactions from "@/mocks/transaction";
import ITransactionFilters from "@/interfaces/ITransactionFilters";
import users from "@/mocks/users";
import IUser from "@/interfaces/IUser";

class TransactionService {
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
        (transaction: ITransaction) => new Date(transaction.createdAt) >= filters.minDate!
      );
    }

    if (filters.maxDate) {
      filteredTransactions = filteredTransactions.filter(
        (transaction: ITransaction) => new Date(transaction.createdAt) <= filters.maxDate!
      );
    }

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

  async update(data: Partial<ITransaction>) {
    /* // Verifica se usuário existe
    await userService.findById(data.userId!); */

    // Atualizando transação na tabela
    const transaction = await this.findById(data.id!);
    const updatedTransaction = {
      ...transaction,
      ...data, // Substitui os campos com os novos dados
      updatedAt: new Date().toISOString().split("T")[0]
    };
    // Salva as mudanças (no seu caso, atualiza na "tabela" ou array de transações)
    const index = transactions.findIndex(
      (transaction: ITransaction) => transaction.id === data.id
    );
    if (index !== -1) {
      transactions[index] = updatedTransaction;
    }

    // Retorna a transação atualizada
    return updatedTransaction;
  }

  async create(data: ITransaction) {
    // Verifica se o dado é válido
    await this.validateData(data);
    // Verifica se usuário existe
    const user = await userService.findById(data.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Atualizando saldo do usuário
    if (data.type === "EXPENSE") {
      user.balance -= data.value;
    }
    if (data.type === "RECIPE") {
      user.balance += data.value;
    }

    const updatedUser = {
      ...data,
      updatedAt: new Date().toISOString().split("T")[0]
    };

    // Salva as mudanças (no seu caso, atualiza na "tabela" ou array de usuários)
    const index = users.findIndex((user: IUser) => user.id === data.id);
    if (index !== -1) {
      users[index] = updatedUser;
    }
    console.log(users);

    // Criando objeto de nova transação de um usuário
    const transaction = {
      id: Math.round(1000 * Math.random()),
      type: data.type,
      value: data.value,
      category: data.category,
      userId: data.userId,
      createdAt: new Date().toISOString().split("T")[0]
    };

    // Adicionando nova transação na tabela
    transactions.push(transaction);
    // Log da lista de transações
    console.log(transactions);

    return transaction;
  }
}

const transactionService = new TransactionService();
export default transactionService;
