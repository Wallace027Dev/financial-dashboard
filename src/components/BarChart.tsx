import { Category, ITransaction } from "@/interfaces/ITransaction";
import fetchBarTransactions from "@/utils/fetchBarTransactions";
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

interface IBarChartComponent {
  userId: number;
}

export default function BarChartComponent({ userId }: IBarChartComponent) {
  const [chartData, setChartData] = useState<{ date: string; saldo: number }[]>(
    []
  );
  const [rawTransactions, setRawTransactions] = useState<ITransaction[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(30);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
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
  }, [selectedPeriod, selectedCategory, selectedType, userId]);

  const categories = Object.values(Category);

  const categoryColors: Record<Category, string> = {
    [Category.HOUSE]: "#66BB6A",
    [Category.LEISURE]: "#FF9800",
    [Category.TRANSPORT]: "#2196F3",
    [Category.EDUCATION]: "#4169E1",
    [Category.CLOTHING]: "#9C27B0",
    [Category.HEALTH]: "#E53935",
    [Category.FIXED_EXPENSE]: "#757575"
  };

  console.log(chartData);

  return (
    <div className="max-w-[1520px]">
      <h2 className="text-xl font-semibold mb-2">Transações por Categoria</h2>

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
          <Legend
            payload={Object.values(Category).map((category) => ({
              value: category,
              type: "square",
              color: categoryColors[category as Category] || "#8884d8"
            }))}
          />

          {Object.values(Category).map((category) => (
            <Bar
              key={category}
              dataKey="value" // Cada categoria agora tem uma barra separada
              fill={
                (categoryColors as Record<string, string>)[category] ||
                "#8884d8"
              }
              barSize={30}
              radius={[10, 10, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
