import authService from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

class AuthController {
  async authUser(req: NextRequest) {
    const data = await req.json();
    const response = await authService(data);

    return NextResponse.json(response);
  }
}

const authController = new AuthController();
export default authController;
