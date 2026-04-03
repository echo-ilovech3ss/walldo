import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface TutorialStep {
  id: string
  title: string
  message: string
  target: 'input' | 'add-btn' | 'theme' | 'wallpaper-btn'
  greeting?: string
  aiPrompt?: string
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: '1',
    title: 'Hey there! 👋',
    message: "I'm WallDo — your buddy who turns to-dos into desktop wallpapers. Type what's on your mind below and press Enter — it'll become a task automatically.",
    greeting: "What's on your mind today?",
    target: 'input',
  },
  {
    id: '2',
    title: 'Make it yours 🎨',
    message: 'Pick a vibe that feels right. No wrong answers here — you can always swap it later.',
    target: 'theme',
  },
  {
    id: '3',
    title: 'Magic time 🪄',
    message: "Hit this button and watch your tasks become an actual wallpaper. After that, it'll auto-sync whenever things change. Pretty cool, right?",
    target: 'wallpaper-btn',
  },
]

interface TutorialState {
  currentStep: number
  isActive: boolean
  completed: boolean
  hasSeenTutorial: boolean

  startTutorial: () => void
  nextStep: () => void
  prevStep: () => void
  skipTutorial: () => void
  completeTutorial: () => void
  resetTutorial: () => void
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set) => ({
      currentStep: 0,
      isActive: false,
      completed: false,
      hasSeenTutorial: false,

      startTutorial: () => set({ isActive: true, currentStep: 0, completed: false }),
      nextStep: () =>
        set((state) => ({
          currentStep: state.currentStep + 1,
          isActive: state.currentStep + 1 < TUTORIAL_STEPS.length,
          completed: state.currentStep + 1 >= TUTORIAL_STEPS.length,
          hasSeenTutorial: true,
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(0, state.currentStep - 1),
          isActive: state.currentStep - 1 >= 0,
        })),
      skipTutorial: () =>
        set({
          isActive: false,
          completed: true,
          hasSeenTutorial: true,
          currentStep: TUTORIAL_STEPS.length,
        }),
      completeTutorial: () =>
        set({
          isActive: false,
          completed: true,
          hasSeenTutorial: true,
        }),
      resetTutorial: () =>
        set({
          isActive: true,
          currentStep: 0,
          completed: false,
        }),
    }),
    {
      name: 'walldo-tutorial-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ hasSeenTutorial: state.hasSeenTutorial }),
    }
  )
)
