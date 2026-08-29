import React from 'react';
import SuggestionCard from './SuggestionCard';
import BrandLogo from './BrandLogo';

const SUGGESTIONS = [
  { icon: '💼', title: 'What services', subtitle: 'does Logic Intelligence Technologies offer?' },
  { icon: '💰', title: 'Business Pro Pack', subtitle: 'pricing and features' },
  { icon: '⚛️', title: 'React optimization', subtitle: 'tips for reducing re-renders' },
  { icon: '🛠️', title: 'Tech stack', subtitle: 'used in our live products' },
];

export default function WelcomeScreen({ onSelectSuggestion }) {
  return (
    <div className="welcome-screen welcome-fade">
      <div className="welcome-logo logo-float">
        <BrandLogo size={72} />
      </div>
      <h1 className="welcome-title shimmer-text">How can Logic AI help you today?</h1>
      <p className="welcome-subtitle">Your intelligent assistant for software architecture and enterprise solutions.</p>
      <div className="welcome-company">POWERED BY LOGIC INTELLIGENCE TECHNOLOGIES</div>
      
      <div className="suggestion-grid">
        {SUGGESTIONS.map((s, i) => (
          <SuggestionCard 
            key={i}
            icon={s.icon}
            title={s.title}
            subtitle={s.subtitle}
            onClick={() => onSelectSuggestion(`${s.title} ${s.subtitle}`)}
          />
        ))}
      </div>
    </div>
  );
}
