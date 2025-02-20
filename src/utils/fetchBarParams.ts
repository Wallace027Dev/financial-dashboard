export function fetchBarParams(
  userId: number,
  minDateISO: string,
  maxDateISO: string,
  selectedCategory: string,
  selectedType: string
) {
  const params: Record<string, string> = {
    userId: userId.toString(),
    minDate: minDateISO,
    maxDate: maxDateISO
  };

  if (selectedCategory !== "Todos") params.category = selectedCategory;
  if (selectedType !== "Todos") params.type = selectedType;

  return params;
}
