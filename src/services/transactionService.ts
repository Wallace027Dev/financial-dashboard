import ITransaction from "@/interfaces/ITransaction";
import authService from "./authService";
import transactionZod from "@/utils/transactionZod";

const transactions: any = [];

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

  async create(data: ITransaction) {
    // Verifica se o dado é válido
    await this.validateData(data);

    // Criando objeto de nova transação de um usuário
    const transaction = {
      type: data.type,
      value: data.value,
      category: data.category,
      userId: data.userId
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
