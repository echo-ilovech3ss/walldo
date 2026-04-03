import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  suggestions?: string[]
  timestamp: number
}

interface AiChatState {
  messages: ChatMessage[]
  isOpen: boolean
  isLoading: boolean
  apiKey: string
  hasApiKey: boolean

  setOpen: (open: boolean) => void
  setApiKey: (key: string) => void
  sendMessage: (content: string) => Promise<void>
  addSuggestionAsTodo: (suggestion: string) => void
  clearChat: () => void
}

export const useAiChatStore = create<AiChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isOpen: false,
      isLoading: false,
      apiKey: '',
      hasApiKey: false,

      setOpen: (open) => set({ isOpen: open }),

      setApiKey: (key) => set({ apiKey: key, hasApiKey: key.length > 0 }),

      sendMessage: async (content: string) => {
        const { apiKey } = get()
        if (!apiKey) return

        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          role: 'user',
          content,
          timestamp: Date.now(),
        }

        set((state) => ({
          messages: [...state.messages, userMessage],
          isLoading: true,
        }))

        try {
          const response = await window.api.aiChat(content, apiKey)

          if (response.success) {
            const assistantMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: response.content ?? '',
              suggestions: response.suggestions,
              timestamp: Date.now(),
            }

            set((state) => ({
              messages: [...state.messages, assistantMessage],
              isLoading: false,
            }))
          } else {
            const errorMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              role: 'assistant',
              content: `Oops, something went wrong: ${response.error ?? 'Please try again.'}`,
              timestamp: Date.now(),
            }

            set((state) => ({
              messages: [...state.messages, errorMessage],
              isLoading: false,
            }))
          }
        } catch {
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Could not reach the AI service. Check your API key and try again.',
            timestamp: Date.now(),
          }

          set((state) => ({
            messages: [...state.messages, errorMessage],
            isLoading: false,
          }))
        }
      },

      addSuggestionAsTodo: (suggestion: string) => {
        // This is handled via the useTodoStore from the component
        window.dispatchEvent(new CustomEvent('add-suggestion-todo', { detail: suggestion }))
      },

      clearChat: () => set({ messages: [] }),
    }),
    {
      name: 'walldo-ai-chat-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ apiKey: state.apiKey, hasApiKey: state.hasApiKey }),
    }
  )
)
