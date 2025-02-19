import SelectFilter from "@/utils/selectFilter";

interface TransactionsFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedPeriod: number;
  setSelectedPeriod: (value: number) => void;
  allCategories: string[];
  periods: { value: number; label: string }[];
}

function TransactionsFilters({
  selectedCategory,
  setSelectedCategory,
  selectedType,
  setSelectedType,
  selectedPeriod,
  setSelectedPeriod,
  allCategories,
  periods
}: TransactionsFiltersProps) {
  return (
    <div className="flex gap-4 mb-4">
      <SelectFilter
        legend="Categoria"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        options={[
          { value: "Todos", label: "Todos" },
          ...allCategories.map((category) => ({
            value: category,
            label: category
          }))
        ]}
      />
      <SelectFilter
        legend="Tipo"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        options={[
          { value: "Todos", label: "Todos" },
          { value: "RECIPE", label: "Receitas" },
          { value: "EXPENSE", label: "Despesas" }
        ]}
      />
      <SelectFilter
        legend="Período"
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(Number(e.target.value))}
        options={periods}
      />
    </div>
  );
}

export default TransactionsFilters;
