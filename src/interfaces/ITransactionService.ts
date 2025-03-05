import ITransaction from "./ITransaction";
import ITransactionFilters from "./ITransactionFilters";

export interface ITransactionService {
  listAll(filters: ITransactionFilters): Promise<ITransaction[]>;
  findById(id: number): Promise<ITransaction>;
  create(data: ITransaction): Promise<ITransaction>;
  update(data: Partial<ITransaction>): Promise<ITransaction>;
  delete(id: number): Promise<ITransaction>;
}