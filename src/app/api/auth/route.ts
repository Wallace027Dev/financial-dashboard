import AuthController from "@/controllers/authController";
import AuthService from "@/services/authService";
import UserService from "@/services/userService";
import { NextRequest } from "next/server";

const userService = new UserService();
const authService = new AuthService(userService);
const authController = new AuthController(authService);

export async function POST(req: NextRequest) {
  return await authController.authUser(req);
}