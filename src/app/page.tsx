"use client";

import FinancialEvolutionChart from "@/components/FinancialEvolutionChart";
import TransactionsChart from "@/components/TransactionsChart";

export default function Home() {
  return (
    <div>
      <main>
        <TransactionsChart />
        <FinancialEvolutionChart />
      </main>
    </div>
  );
}
