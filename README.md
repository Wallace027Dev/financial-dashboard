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

## USO DE CATEGORIAS PARA ORGANIZAÇÃO DE COMPRAS

### Categorias e suas Cores
As categorias foram escolhidas com base em necessidades comuns e cada uma possui uma cor que facilita a visualização.

#### 🏠 Casa
- **Uso**: Compras relacionadas à manutenção e funcionamento da casa, como produtos de limpeza, utensílios domésticos e mobília.
- **Cor**: `rgb(102, 187, 106)` (#66BB6A - verde suave).

#### 🎉 Lazer
- **Uso**: Gastos com entretenimento, como passeios, cinemas, restaurantes e assinaturas de serviços de streaming.
- **Cor**: `rgb(255, 152, 0)` (#FF9800 - laranja vibrante).

#### 🚗 Transporte
- **Uso**: Gastos relacionados à mobilidade, como combustível, transporte público, manutenção de veículos e pedágios.
- **Cor**: `rgb(33, 150, 243)` (#2196F3 - azul vibrante).

#### 📚 Educação
- **Uso**: Investimentos em aprendizado, como cursos, livros, materiais escolares e treinamentos.
- **Cor**: `rgb(65, 105, 225)` (#4169E1 - azul royal).

#### 👕 Vestuário
- **Uso**: Compras de roupas, calçados e acessórios de moda.
- **Cor**: `rgb(156, 39, 176)` (#9C27B0 - roxo moderno).

#### ❤️ Saúde
- **Uso**: Gastos com bem-estar e prevenção, como consultas médicas, planos de saúde, academia e medicamentos.
- **Cor**: `rgb(229, 57, 53)` (#E53935 - vermelho intenso).

#### 💰 Despesas Fixas
- **Uso**: Contas recorrentes e obrigações financeiras, como aluguel, luz, água, internet e seguros.
- **Cor**: `rgb(117, 117, 117)` (#757575 - cinza neutro).

---

### Como Utilizar
1. **Defina a Categoria**: Para cada compra, escolha a categoria correspondente.
2. **Aplique a Cor**: Se estiver desenvolvendo um sistema, utilize as cores para representar visualmente cada categoria.
3. **Filtragem e Relatórios**: Utilize as categorias para agrupar gastos e facilitar a análise financeira.

---

### Exemplo de Uso em Código
Se você estiver implementando isso em um sistema, pode usar as categorias em um objeto JSON:

```json
{
  "categorias": [
    { "nome": "Casa", "cor": "#66BB6A" },
    { "nome": "Lazer", "cor": "#FF9800" },
    { "nome": "Transporte", "cor": "#2196F3" },
    { "nome": "Educação", "cor": "#1E88E5" },
    { "nome": "Vestuário", "cor": "#9C27B0" },
    { "nome": "Saúde", "cor": "#E53935" },
    { "nome": "Despesas Fixas", "cor": "#757575" }
  ]
}
```

Isso pode ser usado para gerar tabelas, dashboards ou etiquetas coloridas para cada tipo de despesa.
