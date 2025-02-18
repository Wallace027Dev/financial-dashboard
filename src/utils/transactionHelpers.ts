import ITransactionFilters from "@/interfaces/ITransactionFilters";

export function validateFilters(params: URLSearchParams): ITransactionFilters {
  const filters: ITransactionFilters = {};

  if (params.has("category")) {
    filters.category = params.get("category")!;
  }

  const type = params.get("type");
  if (type && (type === "RECIPE" || type === "EXPENSE")) {
    filters.type = type;
  }

  if (params.has("userId")) {
    filters.userId = parseInt(params.get("userId")!);
  }

  if (params.has("minValue")) {
    const minValue = parseFloat(params.get("minValue")!);
    if (!isNaN(minValue)) filters.minValue = minValue;
  }

  if (params.has("maxValue")) {
    const maxValue = parseFloat(params.get("maxValue")!);
    if (!isNaN(maxValue)) filters.maxValue = maxValue;
  }

  if (params.has("minDate")) {
    filters.minDate = new Date(params.get("minDate")!);
  }

  if (params.has("maxDate")) {
    filters.maxDate = new Date(params.get("maxDate")!);
  }

  return filters;
}