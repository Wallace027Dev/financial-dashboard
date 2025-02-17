import { NextRequest, NextResponse } from "next/server";
import transactionService from "@/services/transactionService";

class TransactionController {
  async create(data: NextRequest) {
    try {
      const transaction = await data.json();
      const response = await transactionService.create(transaction);
      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}

const transactionController = new TransactionController();
export default transactionController;
