import { prisma } from ".";

const DEFAULT_USERS = [
  {
    name: "Alice",
    email: "alice@example.com",
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
  },
];

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        }),
      ),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
