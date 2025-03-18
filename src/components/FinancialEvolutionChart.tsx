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
import fetchPieTransactions from "@/utils/fetchPieTransactions";
import periodsForFilter from "@/utils/periodsForFilter";
import formatDateToBR from "@/utils/formatDateToBR";
import ExportButton from "./exportButton";
import { ITransaction } from "@/interfaces/ITransaction";

interface IFinancialEvolutionChartProps {
  userId: number;
}

export default function FinancialEvolutionChart({ userId }: IFinancialEvolutionChartProps) {
  const [chartData, setChartData] = useState<{ date: string; saldo: number }[]>(
    []
  );
  const [rawTransactions, setRawTransactions] = useState<ITransaction[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(30);

  useEffect(() => {
    fetchPieTransactions(
      userId,
      selectedPeriod,
      setChartData,
      setRawTransactions
    );
  }, [selectedPeriod, userId]);

  return (
    <div className="max-w-[1520px]">
      <h2 className="text-xl font-semibold mb-2">
        Evolução Financeira
      </h2>

      <div className="flex justify-between">
        {/* Filtros */}
        <SelectFilter
          legend="Período"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(Number(e.target.value))}
          options={periodsForFilter}
        />

        <ExportButton rawTransactions={rawTransactions} />
      </div>

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
            stroke="#8A2BE2"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
