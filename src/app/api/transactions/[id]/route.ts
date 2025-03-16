import { transactionController } from "@/controllers/backend";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  return await transactionController.delete(req);
}