import ITransaction from "./ITransaction";
import ITransactionFilters from "./ITransactionFilters";

export interface ITransactionController {
  listAll(filters: ITransactionFilters): Promise<ITransaction[]>;
  create(data: ITransaction): Promise<ITransaction>;
  update(data: Partial<ITransaction>): Promise<ITransaction>;
  delete(id: number): Promise<ITransaction>;
}