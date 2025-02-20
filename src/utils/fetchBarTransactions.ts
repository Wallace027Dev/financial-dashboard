import ITransaction from "@/interfaces/ITransaction";
import { getDateRange } from "./getDateRange";
import { groupTransactions } from "./groupTransactions";
import { getFetch } from "./getFetch";
import { fetchBarParams } from "./fetchBarParams";

export async function fetchBarTransactions(
  userId: number,
  selectedPeriod: number,
  selectedCategory: string,
  selectedType: string,
  setChartData: (data: any) => void,
  setRawTransactions: (data: ITransaction[]) => void,
  setAllCategories: (categories: string[]) => void,
  allCategories: string[]
) {
  const { minDateISO, maxDateISO } = getDateRange(selectedPeriod);

  const params = fetchBarParams(
    userId,
    minDateISO,
    maxDateISO,
    selectedCategory,
    selectedType
  );

  try {
    const transactions: ITransaction[] = await getFetch("transactions", params);

    if (allCategories.length === 0) {
      const uniqueCategories = [
        ...new Set(transactions.map((t: ITransaction) => t.category))
      ];
      setAllCategories(uniqueCategories);
    }

    const groupedData = groupTransactions(transactions);
    setChartData(groupedData);
    setRawTransactions(transactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
  }
}
