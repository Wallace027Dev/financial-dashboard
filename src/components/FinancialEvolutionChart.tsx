"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { getDateRange } from "@/utils/getDateRange";
import { getTransactions } from "@/utils/getTransactions";
import { formatTransactions } from "@/utils/formatTransactions";
import SelectFilter from "./selectFilter";

const periods = [
  { value: 7, label: "Última semana" },
  { value: 30, label: "Últimos 30 dias" },
  { value: 90, label: "Últimos 3 meses" },
  { value: 180, label: "Últimos 6 meses" },
  { value: 365, label: "Último ano" }
];

export default function FinancialEvolutionChart() {
  const [chartData, setChartData] = useState<{ date: string; saldo: number }[]>(
    []
  );
  const [selectedPeriod, setSelectedPeriod] = useState<number>(30);
  const [userId, setUserId] = useState<number>(202);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { minDateISO, maxDateISO } = getDateRange(selectedPeriod);
        const transactions = await getTransactions(
          userId,
          minDateISO,
          maxDateISO
        );

        setChartData(formatTransactions(transactions));
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchTransactions();
  }, [selectedPeriod, userId]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Evolução Financeira</h2>

      <SelectFilter
        legend="Período"
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(Number(e.target.value))}
        options={periods}
      />

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
