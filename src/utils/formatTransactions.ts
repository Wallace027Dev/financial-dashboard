import ITransaction from "@/interfaces/ITransaction";

export const formatTransactions = (transactions: ITransaction[]) => {
  console.log("Transações antes do formato:", transactions);

  const formatted = transactions
    .map((t: ITransaction) => ({
      date: t.createdAt
        ? new Date(t.createdAt).toISOString().split("T")[0]
        : "Data Inválida",
      saldo: t.value
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return formatted;
};
