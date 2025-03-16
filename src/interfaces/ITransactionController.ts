import { NextRequest } from "next/server";

export interface ITransactionController {
  listAll(req: NextRequest): Promise<any>;
  create(dreq: NextRequest): Promise<any>;
  update(req: NextRequest): Promise<any>;
  delete(req: NextRequest): Promise<any>;
}