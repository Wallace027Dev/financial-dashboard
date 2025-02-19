export function getDateRange(selectedPeriod: number) {
  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() - selectedPeriod);

  return {
    minDateISO: minDate.toISOString().split("T")[0],
    maxDateISO: today.toISOString().split("T")[0]
  };
}
