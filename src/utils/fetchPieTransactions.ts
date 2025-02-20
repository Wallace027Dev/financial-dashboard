import ITransaction from "@/interfaces/ITransaction";
import { formatTransactions } from "./formatTransactions";
import { getDateRange } from "./getDateRange";
import { getFetch } from "./getFetch";
import formatDateToBR from "./formatDateToBR";

export async function fetchPieTransactions(
  userId: number,
  selectedPeriod: number,
  setChartData: (data: any) => void,
  setRawTransactions: (data: ITransaction[]) => void
) {
  try {
    const { minDateISO, maxDateISO } = getDateRange(selectedPeriod);

    const transactions: ITransaction[] = await getFetch("transactions", {
      userId,
      minDate: minDateISO,
      maxDate: maxDateISO
    });

    const formattedTransactions = transactions.map((t) => ({
      ...t,
      createdAtFormatted: formatDateToBR(t.createdAt),
      deletedAtFormatted: t.deletedAt ? formatDateToBR(t.deletedAt) : null
    }));

    setChartData(formatTransactions(formattedTransactions));
    setRawTransactions(transactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
  }
}
