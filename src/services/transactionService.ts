import ITransaction from "@/interfaces/ITransaction";
import { NextResponse } from "next/server";

const transactions: any = [];

class TransactionService {
  async create(data: ITransaction) {
    const transaction = {
      type: data.type,
      value: data.value,
      category: data.category,
      userId: data.userId
    };
    transactions.push(transaction);

    console.log(transactions);
    return NextResponse.json(transaction);
  }
}
const transactionService = new TransactionService();
export default transactionService;
