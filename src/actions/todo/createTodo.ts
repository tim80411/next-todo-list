"use server";

import { z } from "zod";
import { actionClient } from "../actionClient";
import prisma from "@/db/prismaClient";
import { ICreateTodoResponse } from "./interface/createTodo";

const schema = z.object({
  title: z.string().min(1, "標題不能為空"),
});

export type CreateTodoInput = z.infer<typeof schema>;
export const createTodo = actionClient(
  schema,
  async ({ title }: CreateTodoInput): Promise<ICreateTodoResponse> => {
    try {
      const newTodo = await prisma.todo.create({
        data: {
          title,
        },
      });
      return { success: true, data: newTodo };
    } catch (error) {
      return { success: false, error: "無法創建待辦事項" };
    }
  },
);

export type CreateTodoAction = typeof createTodo;
