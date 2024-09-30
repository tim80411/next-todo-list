"use client";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTodo,
  CreateTodoAction,
  CreateTodoInput,
} from "@/actions/todo/createTodo";
import clsx from "clsx";
import { z } from "zod";
import { QueryKey } from "@/lib/enum/queryKey";

export default function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Awaited<ReturnType<CreateTodoAction>>,
    Error,
    CreateTodoInput
  >({
    mutationFn: async (data) => {
      const result = await createTodo(data);
      if (!result.data?.success) {
        throw new Error(result.data?.error);
      }
      return result;
    },
    onSuccess: () => {
      alert("待辦事項已創建");
      formRef.current?.reset();
      queryClient.invalidateQueries({
        queryKey: [QueryKey.HOME],
      });
    },
    onError: (error) => {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message).join(", ");
        alert(`驗證錯誤: ${errorMessages}`);
      } else {
        alert(error.message || "創建待辦事項時發生錯誤");
      }
    },
  });
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title")?.toString() || "";
    mutation.mutate({ title });
  };

  return (
    <form ref={formRef} className="flex mb-4" action={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Add a new task..."
        className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className={clsx(
          "ml-2 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
          {
            "hover:bg-green-700": !mutation.isPending,
            "opacity-50 cursor-not-allowed": mutation.isPending,
          },
        )}
      >
        {mutation.isPending ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
