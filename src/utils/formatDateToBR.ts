export default function formatDateToBR(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Sao_Paulo"
  };

  const brazilianDate = new Intl.DateTimeFormat("pt-BR", options).format(
    new Date(date)
  );

  return brazilianDate;
}
