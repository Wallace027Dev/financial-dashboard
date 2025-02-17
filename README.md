## ESTRUTURA DO PROJETO
/dashboard-financeiro
 ├── src
 │   ├── pages/
 │   │   ├── api/               Backend (API Routes)
 │   │   │   ├── auth/          Autenticação (Login/Registro)
 │   │   │   ├── transactions/  CRUD de transações
 │   │   ├── dashboard.tsx      Página principal
 │   │   ├── login.tsx          Tela de login/cadastro
 │   ├── components/            Componentes reutilizáveis
 │   ├── hooks/                 Hooks personalizados
 │   ├── lib/                   Configuração do Prisma e outros utilitários
 │   ├── services/              Requisições para a API
 │   ├── styles/                Configuração do Tailwind
 │   ├── utils/                 Funções auxiliares
 ├── prisma/                    Configuração do Prisma
 ├── public/                    Assets públicos
 ├── .env.local                 Variáveis de ambiente
 ├── package.json
 ├── tailwind.config.js
 ├── next.config.js
 ├── tsconfig.json
 └── README.md