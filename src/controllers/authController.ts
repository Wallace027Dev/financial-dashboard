import authService from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

class AuthController {
  async authUser(req: NextRequest) {
    try {
      const data = await req.json();
      const response = await authService.authenticate(data);

      const res = NextResponse.json(response, { status: 200 });

      res.cookies.set("token", response.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24
      });

      return res;
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}

const authController = new AuthController();
export default authController;
