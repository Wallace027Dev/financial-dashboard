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
import SelectFilter from "@/utils/selectFilter";
import TransactionsFilters from "./TransactionFilters";

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

      {/* Filtros */}
      <TransactionsFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        allCategories={allCategories}
        periods={periods}
      />

      {/* Gráfico */}
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
