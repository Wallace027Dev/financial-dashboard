import ITransaction from "@/interfaces/ITransaction";
import exportPdf from "@/components/exportPdf";
import exportCsv from "./exportCsv";
import generateFileName from "./generateFileName";
import { formatTransactions } from "./formatTransactions";

export async function handleExportTransaction(
  format: "csv" | "pdf",
  data: ITransaction[]
) {
  if (!data?.length) {
    console.warn("Nenhuma transação disponível para exportação.");
    return;
  }

  try {
    const fileName = generateFileName();

    if (format === "csv") {
      exportCsv(data, fileName);
    } else if (format === "pdf") {
      exportPdf(data, fileName);
    } else {
      console.error("Formato de exportação inválido.");
    }
  } catch (error) {
    console.error(`Erro ao exportar ${format.toUpperCase()}:`, error);
  }
}

