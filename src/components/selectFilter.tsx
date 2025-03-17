function SelectFilter({
  legend,
  value,
  onChange,
  options
}: {
  legend?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string | number; label: string }[];
}) {
  const selectId = `select-${legend?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <fieldset className="flex flex-col">
      {legend && (
        <legend className="text-base font-medium" id={selectId}>
          {legend}
        </legend>
      )}
      <select
        id={selectId}
        className="p-2 my-1 border rounded-md text-background cursor-pointer"
        value={value}
        onChange={onChange}
        aria-labelledby={selectId}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

export default SelectFilter;
