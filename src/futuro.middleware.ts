import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/auth";

export function middleware(req: NextRequest) {
  // Obtém o token do cabeçalho Authorization
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token || !verifyToken(token)) {
    // Se o token não existir ou for inválido, redireciona para o login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Permite continuar para a página protegida
  return NextResponse.next();
}

// Especifica quais rotas devem ser protegidas
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
