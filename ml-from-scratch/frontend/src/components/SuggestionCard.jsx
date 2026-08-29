import React from 'react';

export default function SuggestionCard({ icon, title, subtitle, onClick }) {
  return (
    <button className="suggestion-card" onClick={onClick}>
      <span className="suggestion-icon" aria-hidden="true">{icon}</span>
      <div className="suggestion-text">
        <div className="s-title">{title}</div>
        <div className="s-subtitle">{subtitle}</div>
      </div>
    </button>
  );
}
