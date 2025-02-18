import transactionController from "@/controllers/transactionController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return await transactionController.listAll(req);
}

export async function POST(req: NextRequest) {
  return await transactionController.create(req);
}

export async function PUT(req: NextRequest) {
  return await transactionController.update(req);
}