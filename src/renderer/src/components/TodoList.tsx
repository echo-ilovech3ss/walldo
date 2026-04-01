import { ClipboardList } from 'lucide-react'
import { useTodoStore } from '../hooks/useTodoStore'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const todos = useTodoStore((s) => s.todos)

  if (todos.length === 0) {
    return (
      <div className="todo-list todo-list--empty">
        <ClipboardList size={48} />
        <span>No tasks yet. Add one above!</span>
      </div>
    )
  }

  const pending = todos.filter((t) => !t.completed)
  const completed = todos.filter((t) => t.completed)

  return (
    <div className="todo-list">
      {pending.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {completed.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
