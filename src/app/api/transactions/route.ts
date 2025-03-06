import { NextRequest } from "next/server";
import TransactionController from "@/controllers/transactionController";
import TransactionService from "@/services/transactionService";
import UserService from "@/services/userService";

const userService = new UserService();
const transactionService = new TransactionService(userService);
const transactionController = new TransactionController(transactionService);

export async function GET(req: NextRequest) {
  return await transactionController.listAll(req);
}

export async function POST(req: NextRequest) {
  return await transactionController.create(req);
}

export async function PUT(req: NextRequest) {
  return await transactionController.update(req);
}