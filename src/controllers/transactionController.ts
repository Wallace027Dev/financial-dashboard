import { NextRequest, NextResponse } from "next/server";
import transactionService from "@/services/transactionService";
import ITransaction from "@/interfaces/ITransaction";
import ITransactionFilters from "@/interfaces/ITransactionFilters";

class TransactionController {
  async listAll(req: NextRequest) {
    try {
      const filters: ITransactionFilters = {};

      // Usar searchParams para capturar os parâmetros de filtro
      const params = req.nextUrl.searchParams;

      if (params.has("category")) {
        filters.category = params.get("category")!;
      }

      // Verificar se o tipo é válido (RECIPE ou EXPENSE)
      const type = params.get("type");
      if (type && (type === "RECIPE" || type === "EXPENSE")) {
        filters.type = type;
      }

      if (params.has("userId")) {
        filters.userId = parseInt(params.get("userId")!);
      }

      if (params.has("minValue")) {
        filters.minValue = parseFloat(params.get("minValue")!);
      }
  
      if (params.has("maxValue")) {
        filters.maxValue = parseFloat(params.get("maxValue")!);
      }

      if (params.has("minDate")) {
        filters.minDate = new Date(params.get("minDate")!);
      }
  
      if (params.has("maxDate")) {
        filters.maxDate = new Date(params.get("maxDate")!);
      }

      // Passando os filtros para o serviço
      const response = await transactionService.listAll(filters);

      // Retorna a resposta com status 200
      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      // Se ocorrer erro, retorna com status 400
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  async create(req: NextRequest) {
    try {
      const transaction = await req.json();
      const response = await transactionService.create(transaction);
      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }

  async update(req: NextRequest) {
    try {
      const newData = await req.json();

      const updatedTransaction = await transactionService.update(newData);
      return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}

const transactionController = new TransactionController();
export default transactionController;
