"use client";

import React from "react";
import TodoItem from "./TodoItem";
import { Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "@/lib/enum/queryKey";
import { pageTodo } from "@/actions/todo/pageTodo";
import { useRouter, useSearchParams } from "next/navigation";

export default function TodoList() {
  const PAGE_SIZE = 10;
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  const { data: todoData, isLoading } = useQuery({
    queryKey: [QueryKey.HOME, page, PAGE_SIZE],
    queryFn: async () =>
      await pageTodo({ pageNumber: page, pageSize: PAGE_SIZE }),
    staleTime: 1000 * 60,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white">
      {isLoading && <div>載入中...</div>}
      {todoData?.data?.data?.records.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <Pagination
        count={todoData?.data?.data?.totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        className="mt-4 flex justify-center"
      />
    </div>
  );
}
