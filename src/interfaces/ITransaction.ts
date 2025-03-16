export interface ITransactionBase {
  type: "RECIPE" | "EXPENSE";
  value: number;
  category: string;
  userId: number;
}

export interface ITransaction extends ITransactionBase {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}