import getFetch from "@/utils/getFetch";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

interface ITransaction {
  type: "RECIPE" | "EXPENSE";
  value: number;
  category: string;
  userId: number;
}

interface ITransactionChartProps {
  userId: number;
}

export default function PieChartComponent({
  userId
}: ITransactionChartProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    // Função para buscar as transações (simulando o fetch)
    const fetchTransactions = async () => {
      const response = await getFetch("transactions", { userId });
      setTransactions(response);
    };

    fetchTransactions();
  }, []);

  // Função para calcular o total de cada tipo
  const calculateTotals = (transactions: ITransaction[]) => {
    const totals = { RECIPE: 0, EXPENSE: 0 };

    transactions.forEach((transaction) => {
      if (transaction.type === "RECIPE") {
        totals.RECIPE += transaction.value;
      } else if (transaction.type === "EXPENSE") {
        totals.EXPENSE += transaction.value;
      }
    });

    return [
      { name: "Receitas", value: totals.RECIPE },
      { name: "Despesas", value: totals.EXPENSE }
    ];
  };

  const data = calculateTotals(transactions);

  // Definindo as cores para as fatias do gráfico
  const COLORS = ["#38E238", "#FE877C"];

  return (
    <div>
      <h3>Gráfico de Transações</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
