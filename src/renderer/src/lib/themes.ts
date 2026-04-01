import type { ThemeConfig, WallpaperTheme } from './types'

export const THEMES: Record<WallpaperTheme, ThemeConfig> = {
  'midnight-aurora': {
    id: 'midnight-aurora',
    name: 'Midnight Aurora',
    background: 'linear-gradient(145deg, #0F0C29 0%, #1A1048 35%, #302B63 65%, #24243E 100%)',
    textColor: '#ECE9F8',
    accentColor: '#A78BFA',
    checkColor: '#10B981',
    subtitleColor: '#7B77A0'
  },
  'deep-ocean': {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    background: 'linear-gradient(165deg, #020617 0%, #0C2340 30%, #0E3B6A 60%, #0A2647 100%)',
    textColor: '#D1E5F4',
    accentColor: '#38BDF8',
    checkColor: '#2DD4BF',
    subtitleColor: '#5889B0'
  },
  'charcoal-ember': {
    id: 'charcoal-ember',
    name: 'Charcoal Ember',
    background: 'linear-gradient(155deg, #1C1917 0%, #2D1F1F 35%, #44292A 60%, #1C1917 100%)',
    textColor: '#FAF0EB',
    accentColor: '#FB923C',
    checkColor: '#FBBF24',
    subtitleColor: '#A08070'
  },
  'violet-haze': {
    id: 'violet-haze',
    name: 'Violet Haze',
    background: 'linear-gradient(150deg, #13071E 0%, #2E1065 35%, #4C1D95 55%, #1E0A36 100%)',
    textColor: '#EDE5FA',
    accentColor: '#C084FC',
    checkColor: '#E879F9',
    subtitleColor: '#8B6DAE'
  },
  'forest-night': {
    id: 'forest-night',
    name: 'Forest Night',
    background: 'linear-gradient(160deg, #071209 0%, #14452F 35%, #1A5C3A 55%, #0A1F12 100%)',
    textColor: '#D1ECD8',
    accentColor: '#34D399',
    checkColor: '#6EE7B7',
    subtitleColor: '#5E9972'
  },
  'slate-minimal': {
    id: 'slate-minimal',
    name: 'Slate Minimal',
    background: 'linear-gradient(175deg, #111113 0%, #1D1D22 40%, #232329 60%, #111113 100%)',
    textColor: '#E4E4E7',
    accentColor: '#A1A1AA',
    checkColor: '#71717A',
    subtitleColor: '#52525B'
  }
}

export const THEME_LIST = Object.values(THEMES)
export const DEFAULT_THEME: WallpaperTheme = 'midnight-aurora'
