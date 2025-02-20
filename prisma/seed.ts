import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar usuário
  const user = await prisma.user.create({
    data: {
      id: 202,
      name: "Wallace Vieira",
      email: "wallace123@email.com",
      password: "$2b$10$PLLl.8./2Pxu2/IbhucyeutaOXc4PYEL88BhpIL1mJWTqZ64w1Qzu", // Exemplo de senha criptografada
      balance: 1231.97,
      createdAt: new Date("2025-02-17")
    }
  });

  // Inserir transações
  await prisma.transaction.createMany({
    data: [
      {
        id: 982,
        type: "EXPENSE",
        value: 122,
        category: "Restaurante",
        userId: user.id,
        createdAt: new Date("2025-02-18")
      },
      {
        id: 243,
        type: "EXPENSE",
        value: 180.98,
        category: "Restaurante",
        userId: user.id,
        createdAt: new Date("2025-02-09")
      },
      {
        id: 811,
        type: "EXPENSE",
        value: 1232.32,
        category: "Mercado",
        userId: user.id,
        createdAt: new Date("2025-02-17")
      },
      {
        id: 11,
        type: "EXPENSE",
        value: 1232.32,
        category: "Mercado",
        userId: user.id,
        createdAt: new Date("2024-04-17")
      },
      {
        id: 818,
        type: "EXPENSE",
        value: 123,
        category: "Lazer",
        userId: user.id,
        createdAt: new Date("2025-02-17")
      },
      {
        id: 125,
        type: "RECIPE",
        value: 2500,
        category: "Salário mensal",
        userId: user.id,
        createdAt: new Date("2025-02-16")
      },
      {
        id: 556,
        type: "RECIPE",
        value: 1200,
        category: "Freelance",
        userId: user.id,
        createdAt: new Date("2025-02-16"),
        deletedAt: new Date("2025-02-16")
      }
    ]
  });

  console.log("Usuário e transações inseridos com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
