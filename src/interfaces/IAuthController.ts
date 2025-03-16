import { NextRequest } from "next/server";

export interface IAuthController {
  authUser(req: NextRequest): Promise<any>;
}
