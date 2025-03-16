import { AuthService } from "@/services/backend/authService";
import { NextRequest, NextResponse } from "next/server";

export class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async authUser(req: NextRequest) {
    try {
      const data = await req.json();

      // Chama o serviço de autenticação passando os dados do usuário
      const response = await this.authService.authenticate(data);
      // Cria uma resposta JSON com o status 200, indicando sucesso na autenticação
      const responseJSON = NextResponse.json(response, { status: 200 });

      // Define o cookie com o token de autenticação para ser usado em futuras requisições
      responseJSON.cookies.set("token", response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24
      });
      // Retorna a resposta com o token
      return responseJSON;
    } catch (error: any) {
      // Em caso de erro, retorna uma resposta com status 400 e a mensagem de erro
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
