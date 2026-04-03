import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useTodoStore } from '../hooks/useTodoStore'
import { SUGGESTIONS, CATEGORY_LABELS } from '../lib/suggestions'

export function SuggestionChips() {
  const addTodo = useTodoStore((s) => s.addTodo)
  const [isOpen, setIsOpen] = useState(false)

  const handleAddSuggestion = (text: string) => {
    addTodo(text)
    setIsOpen(false)
  }

  return (
    <div className="suggestion-chips">
      <button
        className="suggestion-chips__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Sparkles size={14} />
        <span>{isOpen ? 'Hide ideas' : 'Need ideas?'}</span>
      </button>

      {isOpen && (
        <div className="suggestion-chips__content">
          <div className="suggestion-chips__section">
            <span className="suggestion-chips__label">Quick add</span>
            <div className="suggestion-chips__list">
              {SUGGESTIONS.slice(0, 5).map((suggestion) => (
                <button
                  key={suggestion.id}
                  className="suggestion-chip"
                  onClick={() => handleAddSuggestion(suggestion.text)}
                >
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
