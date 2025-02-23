import { json2csv } from "json-2-csv";
import { saveAs } from "file-saver";
import formatTransactions from "./formatTransactions";

export default function exportCsv(data: any[], fileName: string) {
  try {
    const formattedTransactions = formatTransactions(data);

    const csv = json2csv(formattedTransactions, {
      delimiter: { field: ";" },
      emptyFieldValue: ""
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}.csv`);
    console.log("CSV gerado com sucesso!");
  } catch (error: any) {
    console.error("Não conseguimos gerar o CSV");
  }
}
