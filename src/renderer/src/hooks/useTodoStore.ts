import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Todo, WallpaperTheme } from '../lib/types'
import { DEFAULT_THEME } from '../lib/themes'

interface TodoStore {
  todos: Todo[]
  theme: WallpaperTheme

  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  setTheme: (theme: WallpaperTheme) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      theme: DEFAULT_THEME,

      addTodo: (text: string) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text: text.trim(),
          completed: false,
          createdAt: Date.now()
        }
        set((state) => ({
          todos: [newTodo, ...state.todos]
        }))
      },

      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        }))
      },

      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id)
        }))
      },

      setTheme: (theme: WallpaperTheme) => {
        set({ theme })
      }
    }),
    {
      name: 'walldo-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        todos: state.todos,
        theme: state.theme
      })
    }
  )
)
