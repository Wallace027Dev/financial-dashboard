import ITransaction from "@/interfaces/ITransaction";
import transactionZod from "@/utils/transactionZod";
import userService from "./userService";
import transactions from "@/mocks/transaction";
import ITransactionFilters from "@/interfaces/ITransactionFilters";

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
    const userExists = await userService.findById(data.userId);
    if (!userExists) {
      throw new Error("User not found");
    }

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
