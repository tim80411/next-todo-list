"use client";

import AddTodoForm from "@/components/todo/AddTodoForm";
import TodoList from "@/components/todo/TodoList";

export default function HomeSection() {
  return (
    <div className="bg-white rounded-lg border shadow-md p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}
