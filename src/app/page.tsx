import TodoList from '@/components/todo/TodoList'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <TodoList />
    </main>
  )
}