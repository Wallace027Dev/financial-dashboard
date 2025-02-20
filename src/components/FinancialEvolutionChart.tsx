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

import SelectFilter from "./selectFilter";
import { fetchPieTransactions } from "@/utils/fetchPieTransactions";
import { periodsForFilter } from "@/utils/periodsForFilter";
import formatDateToBR from "@/utils/formatDateToBR";

export default function FinancialEvolutionChart() {
  const [chartData, setChartData] = useState<{ date: string; saldo: number }[]>(
    []
  );
  const [selectedPeriod, setSelectedPeriod] = useState<number>(30);
  const [userId, setUserId] = useState<number>(202);

  useEffect(() => {
    fetchPieTransactions(userId, selectedPeriod, setChartData);
  }, [selectedPeriod, userId]);

  return (
    <div className="max-w-7xl">
      <h2 className="text-lg font-semibold mb-4 text-slate-950">
        Evolução Financeira
      </h2>

      <SelectFilter
        legend="Período"
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(Number(e.target.value))}
        options={periodsForFilter}
      />

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => formatDateToBR(date)}
          />
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
