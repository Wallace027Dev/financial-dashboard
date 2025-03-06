import { NextRequest } from "next/server";
import TransactionController from "@/controllers/transactionController";
import TransactionService from "@/services/transactionService";
import UserService from "@/services/userService";

const userService = new UserService();
const transactionService = new TransactionService(userService);
const transactionController = new TransactionController(transactionService);


export async function DELETE(req: NextRequest) {
  return await transactionController.delete(req);
}