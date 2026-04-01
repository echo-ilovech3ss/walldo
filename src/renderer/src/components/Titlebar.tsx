import { Minus, Square, X } from 'lucide-react'

export function Titlebar() {
  const isMac = window.api?.platform === 'darwin'

  return (
    <div className="titlebar">
      <div className="titlebar__brand">
        <div className="titlebar__logo">W</div>
        <span className="titlebar__name">WallDo</span>
      </div>

      {!isMac && (
        <div className="titlebar__controls">
          <button
            className="titlebar__btn"
            onClick={() => window.api?.windowMinimize()}
            aria-label="Minimize"
          >
            <Minus size={14} />
          </button>
          <button
            className="titlebar__btn"
            onClick={() => window.api?.windowMaximize()}
            aria-label="Maximize"
          >
            <Square size={12} />
          </button>
          <button
            className="titlebar__btn titlebar__btn--close"
            onClick={() => window.api?.windowClose()}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
