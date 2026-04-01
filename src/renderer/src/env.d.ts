/// <reference types="vite/client" />

interface Window {
  api: {
    getScreenSize: () => Promise<{ width: number; height: number; scaleFactor: number }>
    setWallpaper: (dataUrl: string) => Promise<{ success: boolean; path?: string; error?: string }>
    windowMinimize: () => void
    windowMaximize: () => void
    windowClose: () => void
    platform: string
  }
}
