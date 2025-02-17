import authService from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

class AuthController {
  async authUser(req: NextRequest) {
    try {
      const data = await req.json();
      const response = await authService.authenticate(data);
      return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}

const authController = new AuthController();
export default authController;
