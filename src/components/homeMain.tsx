import ExpensesTable from "./expensesTable";
import LineChartComponent from "./LineChart";
import PieChartComponent from "./PieChart";
import BarChartComponent from "./BarChart";

interface ITransactionChartProps {
  userId: number;
}

export default function HomeMain({ userId }: ITransactionChartProps) {
  return (
    <main id="main">
      <section>
        <PieChartComponent userId={userId} />
        <BarChartComponent userId={userId} />
        <ExpensesTable userId={userId} />
      </section>
      <LineChartComponent userId={userId} />
    </main>
  );
}
