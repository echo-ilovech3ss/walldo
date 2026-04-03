import { useState, useRef, useEffect, useCallback, Fragment } from 'react'
import { Send, Plus, Key, Sparkles, Trash2, X } from 'lucide-react'
import { useAiChatStore, type ChatMessage } from '../hooks/useAiChat'
import { useTodoStore } from '../hooks/useTodoStore'

export function NeedIdeas() {
  const { messages, isLoading, apiKey, hasApiKey, setApiKey, sendMessage, clearChat } =
    useAiChatStore()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [apiKeyInput, setApiKeyInput] = useState('')
  const [showApiKeySetup, setShowApiKeySetup] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatInputRef = useRef<HTMLTextAreaElement>(null)
  const addTodo = useTodoStore((s) => s.addTodo)

  useEffect(() => {
    if (isOpen && messages.length > 0 && chatInputRef.current) {
      chatInputRef.current.focus()
    }
  }, [isOpen, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = () => {
    if (!input.trim()) return
    if (!hasApiKey) {
      setShowApiKeySetup(true)
      return
    }
    sendMessage(input.trim())
    setInput('')
  }

  const handleSaveApiKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim())
      setShowApiKeySetup(false)
    }
  }

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input, hasApiKey]
  )

  const toggle = () => {
    if (!isOpen && messages.length === 0 && hasApiKey) {
      // Auto-start with a prompt
      sendMessage('What are some focused tasks I could add to my todo list?')
    }
    setIsOpen(!isOpen)
  }

  const emptyStatePrompts = ['What should I focus on?', 'Help me plan my day', 'Suggest some productive tasks']

  return (
    <div className="need-ideas">
      <button
        className="need-ideas__toggle"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <Sparkles size={14} />
        <span>{isOpen ? 'Close suggestions' : 'Need ideas?'}</span>
      </button>

      {isOpen && (
        <div className="need-ideas__panel">
          {/* Messages */}
          <div className="need-ideas__messages">
            {messages.length === 0 && !showApiKeySetup && (
              <div className="need-ideas__empty">
                <p className="need-ideas__empty-text">Ask AI for task ideas, or pick one below:</p>
                <div className="need-ideas__prompts">
                  {emptyStatePrompts.map((prompt) => (
                    <button
                      key={prompt}
                      className="need-ideas__prompt-chip"
                      onClick={() => {
                        if (hasApiKey) {
                          sendMessage(prompt)
                        } else {
                          setShowApiKeySetup(true)
                        }
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                <button
                  className="need-ideas__setup-link"
                  onClick={() => setShowApiKeySetup(true)}
                  disabled={hasApiKey}
                >
                  <Key size={12} />
                  {hasApiKey ? 'API key set' : 'Set up AI key (free)'}
                </button>
              </div>
            )}

            {messages.map((msg, i) => (
              <Fragment key={msg.id}>
                <div className={`need-ideas__msg need-ideas__msg--${msg.role}`}>
                  <p>{msg.content}</p>
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="need-ideas__msg-suggestions">
                      {msg.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="need-ideas__add-btn"
                          onClick={() => addTodo(suggestion)}
                          title={`Add "${suggestion}"`}
                        >
                          <Plus size={12} />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {i < messages.length - 1 && <div className="need-ideas__divider" />}
              </Fragment>
            ))}

            {isLoading && (
              <div className="need-ideas__msg need-ideas__msg--assistant need-ideas__loading">
                <div className="loading-dots">
                  <div className="loading-dots__dot" />
                  <div className="loading-dots__dot" />
                  <div className="loading-dots__dot" />
                </div>
              </div>
            )}

            {/* API Key Setup */}
            {showApiKeySetup && !hasApiKey && (
              <div className="need-ideas__key-setup">
                <div className="need-ideas__key-header">
                  <Key size={14} />
                  <span>Set up API key</span>
                  <button
                    className="need-ideas__key-close"
                    onClick={() => setShowApiKeySetup(false)}
                  >
                    <X size={12} />
                  </button>
                </div>
                <p className="need-ideas__key-desc">
                  Get a free key at{' '}
                  <button
                    className="need-ideas__key-link"
                    onClick={() => window.open('https://openrouter.ai', '_blank')}
                  >
                    openrouter.ai
                  </button>
                </p>
                <div className="need-ideas__key-row">
                  <input
                    type="password"
                    className="need-ideas__key-field"
                    placeholder="sk-or-v1-..."
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveApiKey()}
                  />
                  <button
                    className="need-ideas__key-save-btn"
                    onClick={handleSaveApiKey}
                    disabled={!apiKeyInput.trim()}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="need-ideas__input-area">
            <div className="need-ideas__input-row">
              <div className="need-ideas__actions">
                <button
                  className="need-ideas__action-btn"
                  onClick={clearChat}
                  title="Clear chat"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <textarea
                ref={chatInputRef}
                className="need-ideas__input"
                placeholder={hasApiKey ? 'Ask for ideas...' : 'Set up API key to chat'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isLoading || (!hasApiKey && !showApiKeySetup)}
              />
              <button
                className="need-ideas__send-btn"
                onClick={handleSend}
                disabled={!input.trim() || isLoading || (!hasApiKey && !showApiKeySetup)}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
