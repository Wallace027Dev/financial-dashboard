import transactionController from "@/controllers/transactionController";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  return await transactionController.delete(req);
}