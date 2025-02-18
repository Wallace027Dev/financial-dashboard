interface ITransactionFilters {
  type?: "RECIPE" | "EXPENSE";
  category?: string;
  userId?: number;
  minValue?: number;
  maxValue?: number;
}

export default ITransactionFilters;
