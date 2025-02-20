import ITransaction from "@/interfaces/ITransaction";

export const formatTransactions = (transactions: ITransaction[]) => {
  let saldo = 0;
  console.log(transactions);
  return transactions.map((transaction) => {
    saldo +=
      transaction.type === "RECIPE" ? transaction.value : -transaction.value;
    return {
      date: new Date(transaction.createdAt).toLocaleDateString("pt-BR"),
      saldo
    };
  });
};
