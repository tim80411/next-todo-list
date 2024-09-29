'use client'
import { useRef } from 'react';

export default function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    console.log(formData)
    // TODO: serer action
    formRef.current?.reset();
  }

  return (
    <form 
      ref={formRef}
      className="flex mb-4"
      action={handleSubmit}
    >
      <input
        type="text"
        placeholder="Add a new task..."
        className="flex-grow shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        type="submit"
        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add
      </button>
    </form>
  );
}