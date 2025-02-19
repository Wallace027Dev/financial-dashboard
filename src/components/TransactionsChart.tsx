import { useEffect, useState } from "react";
import axios from "axios";
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
import ITransaction from "@/interfaces/ITransaction";

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
    const fetchTransactions = async () => {
      const today = new Date();
      const minDate = new Date();
      minDate.setDate(today.getDate() - selectedPeriod);

      const minDateISO = minDate.toISOString().split("T")[0];
      const maxDateISO = today.toISOString().split("T")[0];

      const params = new URLSearchParams({
        userId: userId.toString(),
        minDate: minDateISO,
        maxDate: maxDateISO
      });

      if (selectedCategory !== "Todos")
        params.append("category", selectedCategory);
      if (selectedType !== "Todos") params.append("type", selectedType);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/transactions?${params.toString()}`
        );

        const transactions = response.data as ITransaction[];

        if (allCategories.length === 0) {
          const uniqueCategories = [
            ...new Set(transactions.map((t) => t.category))
          ];
          setAllCategories(uniqueCategories);
        }

        const groupedData = transactions.reduce(
          (acc: any[], transaction: ITransaction) => {
            const existing = acc.find(
              (item) => item.category === transaction.category
            );

            if (existing) {
              if (transaction.type === "RECIPE") {
                existing.receita += transaction.value;
              } else if (transaction.type === "EXPENSE") {
                existing.despesa += transaction.value;
              }
            } else {
              acc.push({
                category: transaction.category,
                receita: transaction.type === "RECIPE" ? transaction.value : 0,
                despesa: transaction.type === "EXPENSE" ? transaction.value : 0
              });
            }

            return acc;
          },
          []
        );

        console.log(
          "transactions: ",
          transactions,
          "groupedData: ",
          groupedData
        );
        setChartData(groupedData);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    };

    fetchTransactions();
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
