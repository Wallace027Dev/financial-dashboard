import { formatTransactions } from "./formatTransactions";
import { getDateRange } from "./getDateRange";
import { getFetch } from "./getFetch";

export async function fetchPieTransactions(
  userId: number,
  selectedPeriod: number,
  setChartData: (data: any) => void
) {
  try {
    const { minDateISO, maxDateISO } = getDateRange(selectedPeriod);

    const transactions = await getFetch("transactions", {
      userId,
      minDate: minDateISO,
      maxDate: maxDateISO
    });

    setChartData(formatTransactions(transactions));
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
  }
}