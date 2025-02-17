import transactionController from "@/controllers/transactionController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await transactionController.create(req);
}