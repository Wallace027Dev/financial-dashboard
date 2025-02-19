import ITransaction from "@/interfaces/ITransaction";

export const groupTransactions = (transactions: ITransaction[]) => {
  return transactions.reduce((acc: any[], transaction: ITransaction) => {
    const existing = acc.find((item) => item.category === transaction.category);

    if (existing) {
      if (transaction.type === "RECIPE") {
        existing.receita += transaction.value;
      } else if (transaction.type === "EXPENSE") {
        existing.despesa += transaction.value;
      }
    } else {
      acc.push({
        category: transaction.category,
        receita: transaction.type === "RECIPE" ? transaction.value : 0,
        despesa: transaction.type === "EXPENSE" ? transaction.value : 0
      });
    }
    return acc;
  }, []);
};