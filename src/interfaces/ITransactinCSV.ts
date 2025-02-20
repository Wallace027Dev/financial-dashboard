interface ITransactionCSV {
  id: number;
  tipo: string;
  valor: number;
  categoria: string;
  usuário: number;
  "Data da criação": string;
  "Data de exclusão": string;
}

export default ITransactionCSV;
