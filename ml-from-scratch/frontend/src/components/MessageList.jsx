import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

export default function MessageList({ messages, loading, onCopy, onRetryLast }) {
  const listRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom smoothly when messages change or loading state changes
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  return (
    <div className="message-stream" role="log" aria-live="polite">
      {messages.map((msg, idx) => (
        <MessageBubble 
          key={idx} 
          message={msg} 
          onCopy={onCopy}
          onRetry={idx === messages.length - 1 && msg.role === 'assistant' ? onRetryLast : null}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
}
