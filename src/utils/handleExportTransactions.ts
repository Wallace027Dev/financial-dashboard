import { saveAs } from "file-saver";
import { json2csv } from "json-2-csv";

import ITransactionCSV from "@/interfaces/ITransactinCSV";
import ITransaction from "@/interfaces/ITransaction";

import formatDate from "./formatDate";
import generateID from "./generateID";
import formatDateToBR from "./formatDateToBR";

export async function handleExportTransaction(data: any) {
  try {
    if (!data || data.length === 0) {
      console.warn("Nenhuma transação disponível para exportação.");
      return;
    }
    // Mapeia os dados e formata
    const formattedTransactions: ITransactionCSV[] = data.map(
      (t: ITransaction) => ({
        id: t.id,
        tipo: t.type === "RECIPE" ? "Receita" : "Despesa",
        valor: t.value,
        categoria: t.category,
        usuário: t.userId,
        "Data da criação": formatDate(t.createdAt),
        "Data de exclusão": t.deletedAt ? formatDate(t.deletedAt) : ""
      })
    );
    // Converte para CSV
    const csv = json2csv(formattedTransactions, {
      delimiter: { field: ";" },
      emptyFieldValue: ""
    });
    // Cria um Blob e baixa o arquivo
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(
      blob,
      `transacoes_${formatDateToBR(new Date())}_${generateID()}.csv`
    );

    console.log("CSV gerado com sucesso!");
  } catch (error) {
    console.error("Erro ao exportar CSV:", error);
  }
}
