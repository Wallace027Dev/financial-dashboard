import { saveAs } from "file-saver";
import { json2csv } from "json-2-csv";

import ITransaction from "@/interfaces/ITransaction";

import formatDate from "./formatDate";
import generateID from "./generateID";
import formatDateToBR from "./formatDateToBR";
import exportPdf from "@/components/exportPdf";

export async function handleExportTransaction(
  format: "csv" | "pdf",
  data: ITransaction[]
) {
  try {
    if (!data || data.length === 0) {
      console.warn("Nenhuma transação disponível para exportação.");
      return;
    }

    const formattedTransactions = data.map((t) => ({
      id: t.id,
      tipo: t.type === "RECIPE" ? "Receita" : "Despesa",
      valor: t.value.toFixed(2),
      categoria: t.category,
      usuário: t.userId,
      "Data da criação": formatDate(t.createdAt),
      "Data de exclusão": t.deletedAt ? formatDate(t.deletedAt) : "-"
    }));

    const fileName = `transacoes_${formatDateToBR(new Date())}_${generateID()}`;

    if (format === "csv") {
      const csv = json2csv(formattedTransactions, {
        delimiter: { field: ";" },
        emptyFieldValue: ""
      });
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${fileName}.csv`);
      console.log("CSV gerado com sucesso!");
    } else if (format === "pdf") {
      console.log("pdf clicado!")
      exportPdf(data);
    } else {
      console.error("Algo deu errado");
    }
  } catch (error) {
    console.error(`Erro ao exportar ${format.toUpperCase()}:`, error);
  }
}
