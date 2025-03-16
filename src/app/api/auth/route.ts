import { authController } from "@/controllers/backend";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return await authController.authUser(req);
}