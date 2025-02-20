import formatDateToBR from "./formatDateToBR";
import generateID from "./generateID";

export default function generateFileName() {
  return `transacoes_${formatDateToBR(new Date())}_${generateID()}`;
}