interface ITransaction {
  id: number;
  type: "RECIPE" | "EXPENSE",
  value: number;
  category: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export default ITransaction;