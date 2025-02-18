"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import ITransaction from "@/interfaces/ITransaction";

export default function TransactionsChart() {
  const [data, setData] = useState<ITransaction[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/transactions?userId=202`
        );
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const groupedData = data.reduce(
        (acc, transaction) => {
          const { category, type, value } = transaction;

          if (!acc[category]) {
            acc[category] = { category, RECIPE: 0, EXPENSE: 0 };
          }

          acc[category][type] += value;

          return acc;
        },
        {} as Record<
          string,
          { category: string; RECIPE: number; EXPENSE: number }
        >
      );

      setChartData(Object.values(groupedData));
    }
  }, [data]);

  return (
    <div className="max-w-7xl">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Receitas e Despesas por Categoria
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="RECIPE" fill="#82ca9d" name="Receitas" />
          <Bar dataKey="EXPENSE" fill="#ff6961" name="Despesas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
