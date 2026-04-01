export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export type WallpaperTheme =
  | 'midnight-aurora'
  | 'deep-ocean'
  | 'charcoal-ember'
  | 'violet-haze'
  | 'forest-night'
  | 'slate-minimal'

export interface ThemeConfig {
  id: WallpaperTheme
  name: string
  background: string
  textColor: string
  accentColor: string
  checkColor: string
  subtitleColor: string
}
