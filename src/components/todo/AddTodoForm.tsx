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
import { Toast } from "../ui/Toast";
import { useToastState } from "@/lib/hooks/useToastState";

export default function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const { toastState, showToast, hideToast } = useToastState();

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
      showToast("待辦事項已創建", { severity: "success" });
      formRef.current?.reset();
      queryClient.invalidateQueries({
        queryKey: [QueryKey.HOME],
      });
    },
    onError: (error) => {
      const message =
        error instanceof z.ZodError
          ? `驗證錯誤: ${error.message}`
          : error.message || "創建待辦事項時發生錯誤";
      showToast(message, { severity: "error" });
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title")?.toString() || "";
    mutation.mutate({ title });
  };

  return (
    <>
      <form ref={formRef} className="flex mb-4" action={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="新增待辦事項..."
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
          {mutation.isPending ? "新增中..." : "新增"}
        </button>
      </form>
      <Toast
        open={toastState.open}
        message={toastState.message}
        severity={toastState.severity}
        duration={toastState.duration}
        onClose={hideToast}
      />
    </>
  );
}
