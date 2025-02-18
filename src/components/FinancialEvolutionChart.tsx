"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import ITransaction from "@/interfaces/ITransaction";

export default function FinancialEvolutionChart() {
  const [data, setData] = useState<ITransaction[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/transactions`
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
      const sortedData = [...data].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      let saldo = 0;
      const formattedData = sortedData.map((transaction) => {
        saldo +=
          transaction.type === "RECIPE"
            ? transaction.value
            : -transaction.value;
        return {
          date: new Date(transaction.createdAt).toLocaleDateString("pt-BR"),
          saldo
        };
      });

      setChartData(formattedData);
    }
  }, [data]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Evolução Financeira</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="saldo"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
