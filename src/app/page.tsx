"use client";
import ITransaction from "@/interfaces/ITransaction";
import axios from "axios";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Home() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/transactions?userId=202`
        );
        const transactions = result.data;

        // Aqui vamos processar os dados para alimentar o gráfico
        const processedData = transactions.reduce(
          (acc: any[], transaction: ITransaction) => {
            const existingCategory = acc.find(
              (item) => item.name === transaction.category
            );

            if (existingCategory) {
              existingCategory.value += transaction.value;
            } else {
              acc.push({
                name: transaction.category,
                value: transaction.value
              });
            }

            return acc;
          },
          []
        );

        setChartData(processedData); // Atualiza os dados do gráfico
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };

    getData();
  }, []);

  const renderPieChart = (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label
      >
        {chartData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={index % 2 === 0 ? "#0088FE" : "#00C49F"}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );

  return (
    <div>
      <h1>Health of Your Finances</h1>
      {renderPieChart}
    </div>
  );
}
