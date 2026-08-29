import React, { useState, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

export default function ChatComposer({ onSend, onStop, loading, disabled }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      // Cap the height so it doesn't take over the screen
      const scrollHeight = Math.min(textareaRef.current.scrollHeight, 200);
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading || disabled) return;
    
    onSend(input);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="input-container">
      <form className="input-box" onSubmit={handleSubmit}>
        <textarea 
          ref={textareaRef}
          className="chat-input"
          placeholder={disabled ? "Logic AI is currently offline..." : "Ask Logic AI..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          aria-label="Message input"
        />
        
        {loading ? (
          <button 
            type="button"
            className="send-btn stop-btn" 
            onClick={onStop}
            aria-label="Stop generation"
            title="Stop generation"
          >
            <Square size={20} />
          </button>
        ) : (
          <button 
            type="submit"
            className={`send-btn ${input.trim() && !disabled ? 'active' : ''}`}
            disabled={!input.trim() || disabled}
            aria-label="Send message"
            title="Send message"
          >
            <Send size={20} />
          </button>
        )}
      </form>
      <div className="input-disclaimer">
        Logic AI may display inaccurate info, so double-check its responses.
      </div>
    </div>
  );
}
