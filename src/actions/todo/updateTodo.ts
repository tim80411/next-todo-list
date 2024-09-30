"use server";

import { z } from "zod";
import { actionClient } from "../actionClient";
import prisma from "@/db/prismaClient";
import { IUpdateTodoResponse } from "./interface/updateTodo";

const schema = z.object({
  id: z.string().uuid(),
  completedAt: z.date().optional().nullable(),
});

export type UpdateTodoInput = z.infer<typeof schema>;
export const updateTodo = actionClient(
  schema,
  async ({
    completedAt,
    id,
  }: UpdateTodoInput): Promise<IUpdateTodoResponse> => {
    try {
      const todo = await prisma.todo.update({
        where: { id },
        data: { completedAt },
      });

      return { success: true, data: todo };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      } else {
        return { success: false, error: "Unknown error occurred" };
      }
    }
  },
);

export type UpdateTodoAction = typeof updateTodo;
