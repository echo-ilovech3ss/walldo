import { forwardRef, useEffect, useState } from 'react'
import { useTodoStore } from '../hooks/useTodoStore'
import { THEMES } from '../lib/themes'

interface ScreenSize {
  width: number
  height: number
}

export const WallpaperCanvas = forwardRef<HTMLDivElement>((_, ref) => {
  const todos = useTodoStore((s) => s.todos)
  const themeId = useTodoStore((s) => s.theme)
  const theme = THEMES[themeId]
  const [screenSize, setScreenSize] = useState<ScreenSize>({ width: 1920, height: 1080 })

  useEffect(() => {
    window.api?.getScreenSize().then((size) => {
      setScreenSize({ width: size.width, height: size.height })
    })
  }, [])

  const pending = todos.filter((t) => !t.completed)
  const completed = todos.filter((t) => t.completed)
  const totalCount = todos.length
  const completedCount = completed.length

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })

  // Scale factor for rendering text appropriately at screen resolution
  const scale = screenSize.width / 1920
  const fontSize = Math.round(18 * scale)
  const headerFontSize = Math.round(42 * scale)
  const subFontSize = Math.round(16 * scale)
  const dateFontSize = Math.round(14 * scale)
  const checkSize = Math.round(20 * scale)
  const padding = Math.round(80 * scale)
  const itemGap = Math.round(12 * scale)
  const sectionGap = Math.round(32 * scale)

  return (
    <div className="wallpaper-canvas-wrapper">
      <div
        ref={ref}
        style={{
          width: screenSize.width,
          height: screenSize.height,
          background: theme.background,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: `${padding}px`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            width: Math.round(600 * scale),
            height: Math.round(600 * scale),
            borderRadius: '50%',
            background: theme.accentColor,
            opacity: 0.03,
            filter: `blur(${Math.round(80 * scale)}px)`
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-5%',
            width: Math.round(400 * scale),
            height: Math.round(400 * scale),
            borderRadius: '50%',
            background: theme.checkColor,
            opacity: 0.04,
            filter: `blur(${Math.round(60 * scale)}px)`
          }}
        />

        {/* Date */}
        <div
          style={{
            fontSize: dateFontSize,
            color: theme.subtitleColor,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: Math.round(8 * scale),
            fontWeight: 500
          }}
        >
          {dateStr}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: headerFontSize,
            fontWeight: 700,
            color: theme.textColor,
            lineHeight: 1.2,
            marginBottom: Math.round(6 * scale)
          }}
        >
          Today's Focus
        </div>

        {/* Progress subtitle */}
        <div
          style={{
            fontSize: subFontSize,
            color: theme.subtitleColor,
            marginBottom: sectionGap,
            fontWeight: 400
          }}
        >
          {totalCount === 0
            ? 'No tasks — enjoy your day!'
            : `${completedCount} of ${totalCount} tasks completed`}
        </div>

        {/* Progress bar */}
        {totalCount > 0 && (
          <div
            style={{
              width: Math.round(300 * scale),
              height: Math.round(4 * scale),
              background: 'rgba(255,255,255,0.08)',
              borderRadius: Math.round(2 * scale),
              marginBottom: sectionGap,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${(completedCount / totalCount) * 100}%`,
                height: '100%',
                background: theme.checkColor,
                borderRadius: Math.round(2 * scale),
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        )}

        {/* Pending tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: itemGap }}>
          {pending.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: Math.round(14 * scale)
              }}
            >
              <div
                style={{
                  width: checkSize,
                  height: checkSize,
                  borderRadius: Math.round(4 * scale),
                  border: `2px solid ${theme.subtitleColor}`,
                  flexShrink: 0
                }}
              />
              <span
                style={{
                  fontSize,
                  color: theme.textColor,
                  fontWeight: 400,
                  lineHeight: 1.5
                }}
              >
                {todo.text}
              </span>
            </div>
          ))}
        </div>

        {/* Completed tasks */}
        {completed.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: itemGap,
              marginTop: pending.length > 0 ? sectionGap : 0
            }}
          >
            <div
              style={{
                fontSize: Math.round(13 * scale),
                color: theme.subtitleColor,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontWeight: 600,
                marginBottom: Math.round(4 * scale)
              }}
            >
              Completed
            </div>
            {completed.map((todo) => (
              <div
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: Math.round(14 * scale),
                  opacity: 0.45
                }}
              >
                <div
                  style={{
                    width: checkSize,
                    height: checkSize,
                    borderRadius: Math.round(4 * scale),
                    background: theme.checkColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <svg
                    width={Math.round(12 * scale)}
                    height={Math.round(12 * scale)}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize,
                    color: theme.subtitleColor,
                    fontWeight: 400,
                    textDecoration: 'line-through',
                    lineHeight: 1.5
                  }}
                >
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Branding watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: Math.round(30 * scale),
            right: padding,
            fontSize: Math.round(11 * scale),
            color: theme.subtitleColor,
            opacity: 0.3,
            fontWeight: 500,
            letterSpacing: '1px'
          }}
        >
          WALLDO
        </div>
      </div>
    </div>
  )
})

WallpaperCanvas.displayName = 'WallpaperCanvas'
