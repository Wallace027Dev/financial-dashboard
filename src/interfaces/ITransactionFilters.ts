interface ITransactionFilters {
  type?: "RECIPE" | "EXPENSE";
  category?: string;
  userId?: number;
  minValue?: number;
  maxValue?: number;
  minDate?: Date;
  maxDate?: Date;
}

export default ITransactionFilters;
