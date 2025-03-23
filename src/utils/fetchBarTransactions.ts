import { ITransaction } from "@/interfaces/ITransaction";
import getDateRange from "./getDateRange";
import getFetch from "./getFetch";
import fetchBarParams from "./fetchBarParams";
export default async function fetchBarTransactions(
  userId: number,
  selectedPeriod: number,
  setChartData: (data: { category: string; value: number }[]) => void,
  setRawTransactions: (data: ITransaction[]) => void
) {
  try {
    const { minDateISO, maxDateISO } = getDateRange(selectedPeriod);

    const params = fetchBarParams(userId, minDateISO, maxDateISO);

    const transactions: ITransaction[] = await getFetch("transactions", params);

    // Filtra apenas despesas
    const filteredTransactions = transactions.filter(
      (t) => t.type === "EXPENSE"
    );

    // Processa os dados para o gráfico
    const formattedData = filteredTransactions.reduce<
      { category: string; value: number }[]
    >((acc, t) => {
      const existingCategory = acc.find((item) => item.category === t.category);

      if (existingCategory) {
        existingCategory.value += t.value;
      } else {
        acc.push({ category: t.category, value: t.value });
      }

      return acc;
    }, []);

    setChartData(formattedData);
    setRawTransactions(filteredTransactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
  }
}
