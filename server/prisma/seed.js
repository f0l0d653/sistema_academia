import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Semeando dados de teste com CPF e Telefone...");

  const user1 = await prisma.user.upsert({
    where: { email: "gustavo@devsquad.com" },
    update: {},
    create: {
      name: "Gustavo Aluno Completo",
      cpf: "111.222.333-44",
      phone: "(11) 99999-1111",
      email: "gustavo@devsquad.com",
      password: "senhaSuperSegura123",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "luis@devsquad.com" },
    update: {},
    create: {
      name: "Luis Dev Master",
      cpf: "555.666.777-88",
      phone: "(11) 99999-2222",
      email: "luis@devsquad.com",
      password: "senhaDoLuisDoisTres",
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: "augusto@devsquad.com" },
    update: {},
    create: {
      name: "Augusto Partner Pro",
      cpf: "999.888.777-66",
      phone: "(11) 99999-3333",
      email: "augusto@devsquad.com",
      password: "senhaDoAugustoGamer",
    },
  });

  console.log("✅ Usuarios de teste salvos com sucesso!");
  console.table([user1, user2, user3], ["name", "cpf", "phone", "email"]);
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
