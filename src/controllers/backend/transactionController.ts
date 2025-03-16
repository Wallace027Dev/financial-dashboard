import { NextRequest, NextResponse } from "next/server";
import { validateFilters } from "@/utils/transactionHelpers";
import { handleError } from "@/utils/handleError";
import { TransactionService } from "@/services/backend/transactionService";
import { ITransactionController } from "@/interfaces/ITransactionController";

export class TransactionController implements ITransactionController {
  private transactionService: TransactionService;
  constructor(transactionService: TransactionService) {
    this.transactionService = transactionService;
  }

  async listAll(req: NextRequest) {
    try {
      const filters = validateFilters(req.nextUrl.searchParams);
      const transactions = await this.transactionService.listAll(filters);

      if (!transactions.length) {
        return NextResponse.json(
          { message: "Transactions not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(transactions, { status: 200 });
    } catch (error: any) {
      return handleError(error);
    }
  }

  async create(req: NextRequest) {
    try {
      const transaction = await req.json();
      const response = await this.transactionService.create(transaction);
      return NextResponse.json(response, { status: 201 });
    } catch (error: any) {
      return handleError(error);
    }
  }

  async update(req: NextRequest) {
    try {
      const newData = await req.json();
      const updatedTransaction = await this.transactionService.update(newData);
      return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error: any) {
      return handleError(error);
    }
  }

  async delete(req: NextRequest) {
    try {
      const id = Number(req.nextUrl.pathname.split("/").pop());
      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }

      await this.transactionService.delete(id);
      return NextResponse.json(
        { message: "Transaction deleted successfully" },
        { status: 200 }
      );
    } catch (error: any) {
      return handleError(error);
    }
  }
}
