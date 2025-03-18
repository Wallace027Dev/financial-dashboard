export enum Category {
  HOUSE = "Casa",
  LEISURE = "Lazer",
  TRANSPORT = "Transporte",
  EDUCATION = "Educação",
  CLOTHING = "Vestuário",
  HEALTH = "Saúde",
  FIXED_EXPENSE = "Despesas fixas"
}

export interface ITransactionBase {
  type: "RECIPE" | "EXPENSE";
  value: number;
  category: Category;
  userId: number;
}

export interface ITransaction extends ITransactionBase {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
