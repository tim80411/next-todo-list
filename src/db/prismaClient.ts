import { PrismaClient } from "@prisma/client";

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

export default prisma;
