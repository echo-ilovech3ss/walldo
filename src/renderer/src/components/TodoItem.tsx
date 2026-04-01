import { Check, Trash2 } from 'lucide-react'
import type { Todo } from '../lib/types'
import { useTodoStore } from '../hooks/useTodoStore'
import { useCallback } from 'react'

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((s) => s.toggleTodo)
  const deleteTodo = useTodoStore((s) => s.deleteTodo)

  const handleToggle = useCallback(() => {
    toggleTodo(todo.id)
  }, [todo.id, toggleTodo])

  const handleDelete = useCallback(() => {
    deleteTodo(todo.id)
  }, [todo.id, deleteTodo])

  return (
    <div className={`todo-item ${todo.completed ? 'todo-item--completed' : ''}`}>
      <button
        className={`todo-item__checkbox ${todo.completed ? 'todo-item__checkbox--checked' : ''}`}
        onClick={handleToggle}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && <Check size={12} strokeWidth={3} color="white" />}
      </button>

      <span className="todo-item__text">{todo.text}</span>

      <button
        className="todo-item__delete"
        onClick={handleDelete}
        aria-label="Delete task"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}
