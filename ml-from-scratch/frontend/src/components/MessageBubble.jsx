import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, RotateCcw } from 'lucide-react';
import BrandLogo from './BrandLogo';
import TypingIndicator from './TypingIndicator';

export default function MessageBubble({ message, onCopy, onRetry }) {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.role === 'assistant';

  if (isAssistant && !message.text) {
    return <TypingIndicator />;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text)
      .then(() => {
        setCopied(true);
        if (onCopy) onCopy();
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text', err);
        // Toast for clipboard failure would go here if passed down
      });
  };

  return (
    <div className={`chat-bubble message-row ${isAssistant ? 'assistant' : 'user'}`}>
      <div className={`avatar ${isAssistant ? 'avatar-assistant' : 'avatar-user'}`} aria-hidden="true">
        {isAssistant ? <BrandLogo size={18} /> : 'U'}
      </div>
      
      <div className="message-content">
        <div className="message-text">
          {isAssistant ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.text}
            </ReactMarkdown>
          ) : (
            <div className="user-text-content">{message.text}</div>
          )}
        </div>
        
        {isAssistant && (
          <div className="message-actions">
            <button 
              className="action-btn" 
              onClick={handleCopy}
              aria-label={copied ? "Copied to clipboard" : "Copy response"}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span className="sr-only">Copy</span>
            </button>
            {onRetry && (
              <button 
                className="action-btn" 
                onClick={onRetry}
                aria-label="Retry response"
              >
                <RotateCcw size={14} />
                <span className="sr-only">Retry</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
