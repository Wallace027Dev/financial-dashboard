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

const periods = [
  { label: "Últimos 7 dias", value: 7 },
  { label: "Últimos 30 dias", value: 30 },
  { label: "Últimos 3 meses", value: 90 }
];

export default function FinancialEvolutionChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [userId, setUserId] = useState(202);

  useEffect(() => {
    const fetchTransactions = async () => {
      const today = new Date();
      const minDate = new Date();
      minDate.setDate(today.getDate() - selectedPeriod);

      const formattedMaxDate = today.toISOString().split("T")[0];
      const formattedMinDate = minDate.toISOString().split("T")[0];

      try {
        const response = await axios.get(
          `http://localhost:3000/api/transactions?userId=${userId}&minDate=${formattedMinDate}&maxDate=${formattedMaxDate}`
        );

        let saldo = 0;
        const formattedData = response.data.map((transaction: ITransaction) => {
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
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchTransactions();
  }, [selectedPeriod]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Evolução Financeira</h2>

      <select
        className="mb-4 p-2 border rounded-md"
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(Number(e.target.value))}
      >
        {periods.map((period) => (
          <option key={period.value} value={period.value}>
            {period.label}
          </option>
        ))}
      </select>

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
