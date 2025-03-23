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
  Cell
} from "recharts";
import SelectFilter from "./selectFilter";
import periodsForFilter from "@/utils/periodsForFilter";
import ExportButton from "./exportButton";

interface IBarChartComponent {
  userId: number;
}

export default function BarChartComponent({ userId }: IBarChartComponent) {
  const [chartData, setChartData] = useState<
    { category: string; value: number }[]
  >([]);
  const [rawTransactions, setRawTransactions] = useState<ITransaction[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(30);

  useEffect(() => {
    fetchBarTransactions(
      userId,
      selectedPeriod,
      setChartData,
      setRawTransactions
    );
  }, [selectedPeriod, userId]);

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

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData} // Deve conter um array de objetos, cada um com "category" e "value"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />

          {/* Apenas um Bar, pois cada categoria já está separada nos dados */}
          <Bar
            dataKey="value"
            fill="#8884d8"
            barSize={30}
            radius={[10, 10, 0, 0]}
          >
            {/* Customizando a cor da barra conforme a categoria */}
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={categoryColors[entry.category as Category] || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
