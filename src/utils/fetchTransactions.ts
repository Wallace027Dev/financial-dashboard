import axios from "axios";
import ITransaction from "@/interfaces/ITransaction";
import { getDateRange } from "./getDateRange";
import { groupTransactions } from "./groupTransactions";

export async function fetchTransactions(
  userId: number,
  selectedPeriod: number,
  selectedCategory: string,
  selectedType: string,
  setChartData: (data: any) => void,
  setAllCategories: (categories: string[]) => void,
  allCategories: string[]
) {
  const { minDateISO, maxDateISO } = getDateRange(selectedPeriod);

  const params = new URLSearchParams({
    userId: userId.toString(),
    minDate: minDateISO,
    maxDate: maxDateISO
  });

  if (selectedCategory !== "Todos") params.append("category", selectedCategory);
  if (selectedType !== "Todos") params.append("type", selectedType);

  try {
    const response = await axios.get(
      `http://localhost:3000/api/transactions?${params.toString()}`
    );

    const transactions = response.data as ITransaction[];

    if (allCategories.length === 0) {
      const uniqueCategories = [
        ...new Set(transactions.map((t) => t.category))
      ];
      setAllCategories(uniqueCategories);
    }

    const groupedData = groupTransactions(transactions);

    console.log("transactions:", transactions, "groupedData:", groupedData);
    setChartData(groupedData);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
  }
}
