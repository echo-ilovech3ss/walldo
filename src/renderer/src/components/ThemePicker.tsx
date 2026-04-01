import { X } from 'lucide-react'
import { useTodoStore } from '../hooks/useTodoStore'
import { THEME_LIST } from '../lib/themes'
import type { WallpaperTheme } from '../lib/types'

interface ThemePickerProps {
  onClose: () => void
}

export function ThemePicker({ onClose }: ThemePickerProps) {
  const currentTheme = useTodoStore((s) => s.theme)
  const setTheme = useTodoStore((s) => s.setTheme)

  const handleSelect = (themeId: WallpaperTheme) => {
    setTheme(themeId)
  }

  return (
    <div className="theme-overlay" onClick={onClose}>
      <div className="theme-picker" onClick={(e) => e.stopPropagation()}>
        <div className="theme-picker__header">
          <h3 className="theme-picker__title">Wallpaper Theme</h3>
          <button className="theme-picker__close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="theme-picker__grid">
          {THEME_LIST.map((theme) => (
            <button
              key={theme.id}
              className={`theme-card ${theme.id === currentTheme ? 'theme-card--active' : ''}`}
              style={{ background: theme.background }}
              onClick={() => handleSelect(theme.id)}
              aria-label={`Select ${theme.name} theme`}
            >
              <span className="theme-card__label">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
