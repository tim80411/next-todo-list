import TodoItem from './TodoItem';

export default function TodoList() {
  return (
    <div className="w-full bg-white">
      <TodoItem/>
      <TodoItem/>
    </div>
  );
}