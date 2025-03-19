import { useState } from "react";
import ExpensesTable from "./expensesTable";
import FinancialEvolutionChart from "./FinancialEvolutionChart";
import TransactionsChart from "./TransactionsChart";

interface ITransactionChartProps {
  userId: number;
}

export default function HomeMain({ userId }: ITransactionChartProps) {
  return (
    <main id="main" className="py-4">
      <section>
        <TransactionsChart userId={userId} />
        <ExpensesTable userId={userId} />
      </section>
      <FinancialEvolutionChart  userId={userId} />
    </main>
  );
}
