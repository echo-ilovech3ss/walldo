import { useTodoStore } from '../hooks/useTodoStore'
import { THEME_LIST } from '../lib/themes'
import type { WallpaperTheme } from '../lib/types'

export function ThemeSwatches() {
  const currentTheme = useTodoStore((s) => s.theme)
  const setTheme = useTodoStore((s) => s.setTheme)

  return (
    <div className="theme-swatches">
      <span className="theme-swatches__label">Theme</span>
      <div className="theme-swatches__list">
        {THEME_LIST.map((theme) => (
          <button
            key={theme.id}
            className={`theme-swatch ${theme.id === currentTheme ? 'theme-swatch--active' : ''}`}
            style={{ background: theme.background }}
            onClick={() => setTheme(theme.id as WallpaperTheme)}
            title={theme.name}
            aria-label={`Select ${theme.name} theme`}
          >
            {theme.id === currentTheme && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6L5 9L10 3"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
