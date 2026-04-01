import { useState, useRef, useCallback, useEffect } from 'react'
import { Image, Zap, ZapOff } from 'lucide-react'
import { toPng } from 'html-to-image'
import { Titlebar } from './components/Titlebar'
import { AddTodo } from './components/AddTodo'
import { TodoList } from './components/TodoList'
import { ThemeSwatches } from './components/ThemeSwatches'
import { WallpaperCanvas } from './components/WallpaperCanvas'
import { useTodoStore } from './hooks/useTodoStore'

type ToastType = 'success' | 'error'

interface Toast {
  message: string
  type: ToastType
}

export default function App() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [autoSync, setAutoSync] = useState(false)
  const [hasSetOnce, setHasSetOnce] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isGeneratingRef = useRef(false)

  const todos = useTodoStore((s) => s.todos)
  const theme = useTodoStore((s) => s.theme)

  const showToast = useCallback((message: string, type: ToastType) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const generateAndSetWallpaper = useCallback(async (silent = false) => {
    if (!canvasRef.current) return
    if (isGeneratingRef.current) return

    isGeneratingRef.current = true
    if (!silent) setIsGenerating(true)

    try {
      // Small delay to let the canvas re-render with new state
      await new Promise((r) => setTimeout(r, 100))

      const dataUrl = await toPng(canvasRef.current, {
        quality: 1.0,
        pixelRatio: 1,
        cacheBust: true
      })

      const result = await window.api.setWallpaper(dataUrl)

      if (result.success) {
        if (!silent) showToast('Wallpaper set! ✨', 'success')
        setHasSetOnce(true)
      } else {
        if (!silent) showToast(result.error ?? 'Failed to set wallpaper', 'error')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      console.error('Wallpaper generation failed:', message)
      if (!silent) showToast('Failed to generate wallpaper', 'error')
    } finally {
      isGeneratingRef.current = false
      if (!silent) setIsGenerating(false)
    }
  }, [showToast])

  const handleSetWallpaper = useCallback(async () => {
    if (todos.length === 0) {
      showToast('Add some tasks first!', 'error')
      return
    }
    await generateAndSetWallpaper(false)
    // Auto-enable sync after first manual set
    setAutoSync(true)
  }, [todos.length, showToast, generateAndSetWallpaper])

  // Auto-update wallpaper when todos or theme change (debounced)
  useEffect(() => {
    if (!autoSync || !hasSetOnce) return

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      generateAndSetWallpaper(true)
    }, 1500)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [todos, theme, autoSync, hasSetOnce, generateAndSetWallpaper])

  const pendingCount = todos.filter((t) => !t.completed).length
  const totalCount = todos.length
  const isWindows = window.api?.platform === 'win32'

  return (
    <div className={`app ${isWindows ? 'app--windows' : ''}`}>
      <Titlebar />

      <div className="main-content">
        <div className="header">
          <h1 className="header__title">Tasks</h1>
          <div className="header__right">
            {autoSync && (
              <span className="header__sync-badge" title="Wallpaper auto-syncing">
                <Zap size={12} />
                Live
              </span>
            )}
            {totalCount > 0 && (
              <span className="header__count">
                {pendingCount}/{totalCount}
              </span>
            )}
          </div>
        </div>

        <AddTodo />
        <TodoList />

        <ThemeSwatches />

        <div className="action-bar">
          <button
            id="set-wallpaper-btn"
            className={`action-bar__wallpaper-btn ${isGenerating ? 'action-bar__wallpaper-btn--loading' : ''}`}
            onClick={handleSetWallpaper}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <div className="spinner" />
                Generating...
              </>
            ) : (
              <>
                <Image size={18} />
                {hasSetOnce ? 'Update Wallpaper' : 'Set as Wallpaper'}
              </>
            )}
          </button>

          {hasSetOnce && (
            <button
              id="auto-sync-btn"
              className={`action-bar__sync-btn ${autoSync ? 'action-bar__sync-btn--active' : ''}`}
              onClick={() => setAutoSync((prev) => !prev)}
              title={autoSync ? 'Disable auto-sync' : 'Enable auto-sync'}
              aria-label={autoSync ? 'Disable auto-sync' : 'Enable auto-sync'}
            >
              {autoSync ? <Zap size={18} /> : <ZapOff size={18} />}
            </button>
          )}
        </div>
      </div>

      {/* Hidden wallpaper render target */}
      <WallpaperCanvas ref={canvasRef} />

      {/* Toast notification */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}
