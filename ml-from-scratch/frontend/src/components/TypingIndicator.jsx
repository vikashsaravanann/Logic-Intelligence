import React from 'react';
import BrandLogo from './BrandLogo';

export default function TypingIndicator() {
  return (
    <div className="chat-bubble message-row assistant">
      <div className="avatar avatar-assistant ai-icon-computing" aria-hidden="true">
        <BrandLogo size={18} />
      </div>
      <div className="message-content">
        <div className="typing-dots" aria-label="Logic AI is thinking" role="status">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}
