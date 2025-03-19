import React, { useEffect, useState } from "react";
import { Category, ITransaction } from "@/interfaces/ITransaction";
import getFetch from "@/utils/getFetch";

interface ITransactionsTableProps {
  userId: number;
}

export default function TransactionsTable({ userId }: ITransactionsTableProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    async function getData() {
      const data: ITransaction[] = await getFetch("transactions", {
        userId
      });

      // Ordenando por data (mais recentes primeiro)
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setTransactions(sortedData);
    }

    getData();
  }, [userId]);

  // Função para agrupar transações por data
  const groupTransactionsByDate = (transactions: ITransaction[]) => {
    const grouped: { [key: string]: ITransaction[] } = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt).toLocaleDateString("pt-BR");
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
    });

    return grouped;
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <table className="w-full border-collapse border border-gray-600 shadow-lg">
      <thead>
        <tr className="bg-primary text-background">
          <th className="px-4 py-2 border border-gray-600 text-left font-bold text-xl">
            Tipo
          </th>
          <th className="px-4 py-2 border border-gray-600 text-left font-bold text-xl">
            Valor
          </th>
          <th className="px-4 py-2 border border-gray-600 text-left font-bold text-xl">
            Categoria
          </th>
          <th className="px-4 py-2 border border-gray-600 text-left font-bold text-xl">
            Data
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(groupedTransactions).map((date) => (
          <React.Fragment key={date}>
            <tr>
              <td
                colSpan={4}
                className="bg-gray-800 text-foreground p-1 text-xs text-center font-semibold"
              >
                {date}
              </td>
            </tr>
            {groupedTransactions[date].map((transaction: ITransaction) => (
              <tr
                key={transaction.id}
                className={` border-b border-gray-600 text-foreground text-lg`}
              >
                <td className="px-4 py-2 border border-gray-600 font-bold">
                  {transaction.type === "RECIPE" ? "Entrada" : "Saída"}
                </td>
                <td
                  className={`${
                    transaction.type === "RECIPE"
                      ? "text-type-recipe"
                      : "text-type-expense"
                  } px-4 py-2 border border-gray-600 font-robotoMono`}
                >
                  R$
                  {transaction.value.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {Category[
                    transaction.category as unknown as keyof typeof Category
                  ] || transaction.category}
                </td>
                <td className="px-4 py-2 border border-gray-600">
                  {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
