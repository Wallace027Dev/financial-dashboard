import { NextRequest, NextResponse } from "next/server";
import transactionService from "@/services/transactionService";
import { validateFilters } from "@/utils/transactionHelpers";
import { handleError } from "@/utils/handleError";

class TransactionController {
  async listAll(req: NextRequest) {
    try {
      const filters = validateFilters(req.nextUrl.searchParams);
      const response = await transactionService.listAll(filters);

      if (!response.length) {
        return NextResponse.json(
          { message: "Transactions not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      return handleError(error);
    }
  }

  async create(req: NextRequest) {
    try {
      const transaction = await req.json();
      const response = await transactionService.create(transaction);
      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      return handleError(error);
    }
  }

  async update(req: NextRequest) {
    try {
      const newData = await req.json();
      const updatedTransaction = await transactionService.update(newData);
      return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error: any) {
      return handleError(error);
    }
  }

  async delete(req: NextRequest) {
    try {
      // Resgatando o ID passado na rota
      const pathParts = req.nextUrl.pathname.split("/");
      const id = Number(pathParts[pathParts.length - 1]);

      if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }

      const updatedTransaction = await transactionService.delete(id);
      return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error: any) {
      return handleError(error);
    }
  }
}

const transactionController = new TransactionController();
export default transactionController;
