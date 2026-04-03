import { useState, useEffect, useRef } from 'react'
import { X, ChevronRight, Eye } from 'lucide-react'
import { useTutorialStore, TUTORIAL_STEPS, type TutorialStep } from '../hooks/useTutorial'
import { useTodoStore } from '../hooks/useTodoStore'
import { toPng } from 'html-to-image'

export function TutorialOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [stepInput, setStepInput] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const { currentStep, isActive, nextStep, prevStep, skipTutorial, completeTutorial } =
    useTutorialStore((s) => s)
  const addTodo = useTodoStore((s) => s.addTodo)
  const todos = useTodoStore((s) => s.todos)
  const theme = useTodoStore((s) => s.theme)

  const inputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(isActive)
    if (isActive) {
      setStepInput('')
      setPreviewUrl('')
      setShowPreview(false)
    }
  }, [isActive, currentStep])

  // Auto-focus input when step has a greeting/input field
  useEffect(() => {
    if (isVisible && stepHasInput(currentStep)) {
      setTimeout(() => inputRef.current?.focus(), 400)
    }
  }, [isVisible, currentStep])

  const currentTutorialStep = TUTORIAL_STEPS[currentStep] || TUTORIAL_STEPS[TUTORIAL_STEPS.length - 1]

  const handleNext = () => {
    if (stepHasInput(currentStep) && stepInput.trim()) {
      addTodo(stepInput.trim())
    }

    if (currentStep >= TUTORIAL_STEPS.length - 1) {
      completeTutorial()
      setIsVisible(false)
    } else {
      nextStep()
    }
    setStepInput('')
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      prevStep()
    } else {
      skipTutorial()
      setIsVisible(false)
    }
    setStepInput('')
    setShowPreview(false)
    setPreviewUrl('')
  }

  const handleClose = () => {
    skipTutorial()
    setIsVisible(false)
  }

  // Generate preview from the actual WallpaperCanvas component (it's rendered in App.tsx)
  const handleShowPreview = async () => {
    const canvasEl = document.querySelector('.wallpaper-canvas-wrapper') as HTMLElement
    if (!canvasEl) return
    try {
      const dataUrl = await toPng(canvasEl, {
        quality: 0.8,
        pixelRatio: 1,
        cacheBust: true,
      })
      setPreviewUrl(dataUrl)
      setShowPreview(true)
    } catch {
      // ignore
    }
  }

  if (!isVisible) return null

  const highlightRect = getHighlightRect(currentTutorialStep)
  const hasInput = stepHasInput(currentStep)
  const isWallpaperStep = currentTutorialStep.target === 'wallpaper-btn'

  return (
    <div className="tutorial-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) handleClose()
    }}>
      {/* Glowing highlight ring around target element */}
      <div
        className="tutorial-highlight"
        style={highlightRect}
      />

      {/* Tutorial card */}
      <div className="tutorial-card">
        <button className="tutorial-card__close" onClick={handleClose}>
          <X size={16} />
        </button>

        {/* Avatar + greeting */}
        <div className="tutorial-card__header">
          <div className="tutorial-card__avatar">
            {getAvatarEmoji(currentStep)}
          </div>
          <div className="tutorial-card__greeting">
            {currentTutorialStep.greeting ?? currentTutorialStep.title}
          </div>
        </div>

        {/* Progress bar */}
        <div className="tutorial-card__progress-bar">
          <div
            className="tutorial-card__progress-fill"
            style={{ width: `${((currentStep + 1) / TUTORIAL_STEPS.length) * 100}%` }}
          />
        </div>

        {/* Message */}
        <p className="tutorial-card__message">{currentTutorialStep.message}</p>

        {/* Text input for first step */}
        {hasInput && (
          <input
            ref={inputRef}
            type="text"
            className="tutorial-card__input"
            placeholder="e.g., Finish the project proposal..."
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          />
        )}

        {/* Wallpaper preview on last step */}
        {isWallpaperStep && showPreview && previewUrl && (
          <div className="tutorial-card__preview">
            <img src={previewUrl} alt="Wallpaper preview" />
          </div>
        )}

        {/* Actions */}
        <div className="tutorial-card__actions">
          <button
            className="tutorial-card__btn tutorial-card__btn--skip"
            onClick={handleClose}
          >
            I figured it out
          </button>

          {isWallpaperStep && !showPreview && todos.length > 0 && (
            <button
              className="tutorial-card__btn tutorial-card__btn--preview"
              onClick={handleShowPreview}
            >
              <Eye size={14} />
              Preview
            </button>
          )}

          <button
            className="tutorial-card__btn tutorial-card__btn--primary"
            onClick={handleNext}
          >
            {currentStep >= TUTORIAL_STEPS.length - 1 ? "Let's go" : 'Got it'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

function stepHasInput(step: number): boolean {
  return TUTORIAL_STEPS[step]?.greeting !== undefined
}

function getAvatarEmoji(step: number): string {
  const emojis = ['👋', '🎨', '🪄']
  return emojis[step] ?? '💡'
}

function getHighlightRect(step: TutorialStep): React.CSSProperties {
  let selector: string
  switch (step.target) {
    case 'input':
      selector = '#add-todo-input'
      break
    case 'theme':
      selector = '.theme-swatches__list'
      break
    case 'wallpaper-btn':
      selector = '#set-wallpaper-btn'
      break
    default:
      return {}
  }

  const element = document.querySelector(selector)
  if (!element) return {}

  const rect = element.getBoundingClientRect()
  const padding = 6
  return {
    left: rect.left - padding,
    top: rect.top - padding,
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
  }
}
