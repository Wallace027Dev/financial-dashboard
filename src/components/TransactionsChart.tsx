import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

import { fetchTransactions } from "@/utils/fetchTransactions";

const periods = [
  { label: "Últimos 7 dias", value: 7 },
  { label: "Últimos 30 dias", value: 30 },
  { label: "Últimos 3 meses", value: 90 }
];

export default function TransactionsChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [userId, setUserId] = useState(202);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchTransactions(
      userId,
      selectedPeriod,
      selectedCategory,
      selectedType,
      setChartData,
      setAllCategories,
      allCategories
    );
  }, [selectedCategory, selectedType, selectedPeriod, userId]);

  return (
    <div className="max-w-7xl">
      <h2 className="text-lg font-semibold mb-4 text-slate-950">
        Receitas e Despesas por Categoria
      </h2>
      <div className="flex gap-4 mb-4">
        <select
          className="p-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-md"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="RECIPE">Receitas</option>
          <option value="EXPENSE">Despesas</option>
        </select>

        <select
          className="p-2 border rounded-md"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(Number(e.target.value))}
        >
          {periods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="receita" fill="#82ca9d" />
          <Bar dataKey="despesa" fill="#ff6b6b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
