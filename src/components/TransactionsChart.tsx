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

import fetchBarTransactions from "@/utils/fetchBarTransactions";
import periodsForFilter from "@/utils/periodsForFilter";
import TransactionsFilters from "./TransactionFilters";
import ITransaction from "@/interfaces/ITransaction";
import ExportButton from "./exportButton";

export default function TransactionsChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [rawTransactions, setRawTransactions] = useState<ITransaction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [userId, setUserId] = useState(202);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchBarTransactions(
      userId,
      selectedPeriod,
      selectedCategory,
      selectedType,
      setChartData,
      setRawTransactions,
      setAllCategories,
      allCategories
    );
  }, [selectedCategory, selectedType, selectedPeriod, userId]);

  return (
    <div className="max-w-7xl">
      <h2 className="text-lg font-semibold mb-4 text-slate-950">
        Receitas e Despesas por Categoria
      </h2>
      <div className="flex justify-between">
        {/* Filtros */}
        <TransactionsFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          allCategories={allCategories}
          periods={periodsForFilter}
        />
        <ExportButton rawTransactions={rawTransactions} />
      </div>

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
