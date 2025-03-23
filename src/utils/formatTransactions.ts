import { ITransaction } from "@/interfaces/ITransaction";

export default function formatTransactions(transactions: ITransaction[]) {
  const formatted = transactions
    .map((t: ITransaction) => ({
      date: t.createdAt
        ? new Date(t.createdAt).toISOString().split("T")[0]
        : "Data Inválida",
      saldo: t.value
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return formatted;
}
