"use client";

import { disableTodo, DisableTodoInput } from "@/actions/todo/disableTodo";
import {
  updateTodo,
  UpdateTodoAction,
  UpdateTodoInput,
} from "@/actions/todo/updateTodo";
import { QueryKey } from "@/lib/enum/queryKey";
import { ITodo } from "@/lib/types/entities/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useRef } from "react";

export default function TodoItem({ todo }: { todo: ITodo }) {
  const checkBoxFormRef = useRef<HTMLFormElement>(null);
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const updateMutation = useMutation<
    Awaited<ReturnType<UpdateTodoAction>>,
    Error,
    UpdateTodoInput
  >({
    mutationFn: async (data) => {
      const result = await updateTodo(data);
      if (!result.data?.success) {
        throw new Error(result.data?.error);
      }
      return result;
    },
    onSuccess: () => {
      alert("todo updated");
      queryClient.invalidateQueries({ queryKey: [QueryKey.HOME] });
    },
    onError: (error) => {
      alert(error.message || "update todo failed");
    },
  });

  const disableMutation = useMutation<
    Awaited<ReturnType<UpdateTodoAction>>,
    Error,
    DisableTodoInput
  >({
    mutationFn: async (data) => {
      const result = await disableTodo(data);
      if (!result.data?.success) {
        throw new Error(result.data?.error);
      }
      return result;
    },
    onSuccess: () => {
      alert("todo disabled");
      queryClient.invalidateQueries({ queryKey: [QueryKey.HOME] });
    },
    onError: (error) => {
      alert(error.message || "disable todo failed");
    },
  });

  const handleToggle = () => {
    const isCheck = checkBoxRef.current?.checked;
    const completedAt = isCheck ? new Date() : null;
    updateMutation.mutate({ id: todo.id, completedAt });
  };

  const handleDelete = () => {
    disableMutation.mutate({ id: todo.id });
  };

  const handleInputOnChange = () => {
    checkBoxFormRef.current?.requestSubmit();
  };

  return (
    <div className="bg-white flex py-2 px-2 border">
      <form
        ref={checkBoxFormRef}
        action={handleToggle}
        className="flex-none w-8 flex items-center"
      >
        <input
          type="checkbox"
          ref={checkBoxRef}
          checked={todo.completedAt !== null}
          className="form-checkbox h-5 w-5 text-green-600"
          onChange={handleInputOnChange}
        />
      </form>
      <span
        className={clsx(
          "flex-grow px-2 text-left flex items-center",
          todo.completedAt && "line-through text-gray-400",
        )}
      >
        {todo.title}
      </span>
      <form action={handleDelete} className="flex-none w-8">
        <button
          type="submit"
          className="px-1 py-1 rounded font-bold transition-colors duration-200 bg-red-500 hover:bg-red-600 text-white"
          disabled={updateMutation.isPending}
        >
          ✕
        </button>
      </form>
    </div>
  );
}
