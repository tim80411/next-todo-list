"use server";

import { z } from "zod";
import { actionClient } from "../actionClient";
import prisma from "@/db/prismaClient";
import { IPageTodoResponse } from "./interface/pageTodo";
import { BasePagination } from "../baseAction";
import { ITodo } from "@/lib/types/entities/todo";
import { Prisma } from "@prisma/client";

const schema = z.object({
  pageNumber: z.number().int().positive().min(1),
  pageSize: z.number().int().positive().max(10),
});

export type PageTodoInput = z.infer<typeof schema>;
export const pageTodo = actionClient(
  schema,
  async ({
    pageNumber,
    pageSize,
  }: PageTodoInput): Promise<IPageTodoResponse> => {
    try {
      const [todoList, todoAmount] = await Promise.all([
        prisma.todo.findMany({
          where: {
            disabled: false,
          },
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
          orderBy: {
            createdAt: Prisma.SortOrder.desc,
          },
        }),
        prisma.todo.count({
          where: {
            disabled: false,
          },
        }),
      ]);

      const data: BasePagination<ITodo> = {
        records: todoList,
        currentPage: pageNumber,
        totalPages: Math.ceil(todoAmount / pageSize),
        totalAmount: todoAmount,
      };

      return { success: true, data };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      } else {
        return { success: false, error: "Unknown error occurred" };
      }
    }
  },
);

export type PageTodoAction = typeof pageTodo;
