"use client";
import { ITodo } from "@/lib/types/entities/todo";
import { useRef, useTransition } from "react";

export default function TodoItem({ todo }: { todo: ITodo }) {
  const checkBoxRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      // TODO: server action
      console.log("toggle success");
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      // TODO: server action
      console.log("delete success");
    });
  };

  const handleInputOnChange = () => {
    checkBoxRef.current?.requestSubmit();
  };

  return (
    <div className="bg-white flex py-2 px-2 border">
      <form
        ref={checkBoxRef}
        action={handleToggle}
        className="flex-none w-8 flex items-center"
      >
        <input
          type="checkbox"
          checked={todo.completedAt !== null}
          className="form-checkbox h-5 w-5 text-green-600"
          onChange={handleInputOnChange}
        />
      </form>
      <span className={"flex-grow px-2 text-left flex items-center"}>
        {todo.title}
      </span>
      <form action={handleDelete} className="flex-none w-8">
        <button
          type="submit"
          className="px-1 py-1 rounded font-bold transition-colors duration-200 bg-red-500 hover:bg-red-600 text-white"
          disabled={isPending}
        >
          ✕
        </button>
      </form>
    </div>
  );
}
