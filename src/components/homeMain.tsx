import FinancialEvolutionChart from "./FinancialEvolutionChart";
import TransactionsChart from "./TransactionsChart";

export default function HomeMain() {
  return (
    <main id="main" className="py-4 min-h-[90vh]">
      <TransactionsChart />
      <FinancialEvolutionChart />
    </main>
  );
}
