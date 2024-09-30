import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });

  // TODO: should import logger for production
  prisma.$on("error" as never, (event) => {
    console.error(event);
  });
  prisma.$on("warn" as never, (event) => {
    console.warn(event);
  });
  prisma.$on("info" as never, (event) => {
    console.info(event);
  });
  prisma.$on("query" as never, (event) => {
    console.log(event);
  });

  return prisma;
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
