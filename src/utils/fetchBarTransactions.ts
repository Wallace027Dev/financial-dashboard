import { ITransaction } from "@/interfaces/ITransaction";
import getDateRange from "./getDateRange";
import getFetch from "./getFetch";
import fetchBarParams from "./fetchBarParams";

export default async function fetchBarTransactions(
  userId: number,
  selectedPeriod: number,
  selectedCategory: string,
  selectedType: string,
  setChartData: (data: any) => void,
  setRawTransactions: (data: ITransaction[]) => void,
  setAllCategories: (categories: string[]) => void,
  allCategories: string[]
) {
  try {
    const { minDateISO, maxDateISO } = getDateRange(selectedPeriod);

    const params = fetchBarParams(
      userId,
      minDateISO,
      maxDateISO,
      selectedCategory,
      selectedType
    );

    const transactions: ITransaction[] = await getFetch("transactions", params);

    const formattedData = transactions
      .filter((t) => t.type === "EXPENSE") // Filtra apenas despesas
      .reduce((acc, t) => {
        const existingCategory = acc.find(
          (item) => item.category === t.category
        );

        if (existingCategory) {
          existingCategory.value += t.value;
        } else {
          acc.push({ category: t.category, value: t.value });
        }

        return acc;
      }, []);

    setChartData(formattedData); // Atualiza o estado do gráfico

    const filteredTransactions = transactions.filter(
      (t) => t.type === "EXPENSE"
    );

    setChartData(formattedData);
    setRawTransactions(filteredTransactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
  }
}
