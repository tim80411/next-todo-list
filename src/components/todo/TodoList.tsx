"use client";
import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Pagination } from "@mui/material";

export default function TodoList() {
  const [page, setPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    console.log("page change", value);
    setPage(value);
  };

  return (
    <div className="w-full bg-white">
      <TodoItem />
      <TodoItem />
      <Pagination
        count={10}
        page={page}
        onChange={handlePageChange}
        color="primary"
        className="mt-4 flex justify-center"
      />
    </div>
  );
}
