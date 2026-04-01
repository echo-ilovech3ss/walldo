import { useState, useCallback } from 'react'
import { Plus } from 'lucide-react'
import { useTodoStore } from '../hooks/useTodoStore'

export function AddTodo() {
  const [text, setText] = useState('')
  const addTodo = useTodoStore((s) => s.addTodo)

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const trimmed = text.trim()
      if (!trimmed) return

      addTodo(trimmed)
      setText('')
    },
    [text, addTodo]
  )

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        id="add-todo-input"
        className="add-todo__input"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
      />
      <button
        id="add-todo-btn"
        className="add-todo__btn"
        type="submit"
        aria-label="Add task"
      >
        <Plus size={20} />
      </button>
    </form>
  )
}
