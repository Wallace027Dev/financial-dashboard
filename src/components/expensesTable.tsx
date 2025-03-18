import { useEffect, useState } from "react";
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

  return (
    <table className="w-full border-collapse border border-foreground shadow-lg">
      <thead>
        <tr className="bg-primary text-foreground">
          <th className="p-3 border border-foreground text-left font-bold text-xl">
            Tipo
          </th>
          <th className="p-3 border border-foreground text-left font-bold text-xl">
            Valor
          </th>
          <th className="p-3 border border-foreground text-left font-bold text-xl">
            Categoria
          </th>
          <th className="p-3 border border-foreground text-left font-bold text-xl">
            Data
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction: ITransaction) => (
          <tr
            key={transaction.id}
            className={`${
              transaction.type === "RECIPE"
                ? "bg-type-recipe"
                : "bg-type-expense"
            } border-b border-foreground text-background text-lg`}
          >
            <td className="p-3 border border-foreground font-bold">
              {transaction.type === "RECIPE" ? "Entrada" : "Saída"}
            </td>
            <td className="p-3 border border-foreground font-robotoMono">
              R${" "}
              {transaction.value.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </td>
            <td className="p-3 border border-foreground">
              {Category[
                transaction.category as unknown as keyof typeof Category
              ] || transaction.category}
            </td>
            <td className="p-3 border border-foreground">
              {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
