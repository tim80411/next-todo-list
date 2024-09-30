import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
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
prismaClient.$on("error" as never, (event) => {
  console.error(event);
});
prismaClient.$on("warn" as never, (event) => {
  console.warn(event);
});
prismaClient.$on("info" as never, (event) => {
  console.info(event);
});
prismaClient.$on("query" as never, (event) => {
  console.log(event);
});

export default prismaClient;
