'use client'
import { useRef, useTransition } from 'react'

export default function TodoItem() {
  const checkBoxRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      // TODO: server action
      console.log('toggle success')
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      // TODO: server action
      console.log('delete success')
    })
  }

  return (
    <div className="bg-white flex py-2 px-2 border">
      <form ref={checkBoxRef} action={handleToggle} className='flex-none w-8 flex items-center'>
        <input
          type="checkbox"
          checked={true}
          className="form-checkbox h-5 w-5 text-green-600"
          onChange={() => {
            checkBoxRef.current?.requestSubmit()
          }}
        />
      </form>
      <span className={'flex-grow px-2 text-left flex items-center'}>
        {'x'.repeat(20)}
      </span>
      <form action={handleDelete} className='flex-none w-8'>
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