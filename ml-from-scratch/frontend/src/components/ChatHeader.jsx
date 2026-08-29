import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import BrandLogo from './BrandLogo';
import ThemeToggle from './ThemeToggle';
import { checkHealth } from '../utils/api';

export default function ChatHeader({ title, theme, toggleTheme, onOpenMenu }) {
  const [serverStatus, setServerStatus] = useState({ online: false, device: 'unknown' });

  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      const status = await checkHealth();
      if (isMounted) {
        if (status.online) {
          setServerStatus({ online: true, device: status.data.device || 'cpu' });
        } else {
          setServerStatus({ online: false, device: 'unknown' });
        }
      }
    };
    check();
    const interval = setInterval(check, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <button 
          className="hamburger" 
          onClick={onOpenMenu}
          aria-label="Open mobile menu"
        >
          <Menu size={20} />
        </button>
        <div className="top-bar-title">
          <BrandLogo size={18} />
          <span className="title-text">{title || 'Core Intelligence v1.0'}</span>
        </div>
      </div>
      
      <div className="top-bar-right">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <div className={`status-pill ${serverStatus.online ? 'status-online' : 'status-offline'}`}>
          <span className="status-dot"></span>
          {serverStatus.online ? `Local Weights (${serverStatus.device})` : 'Backend Offline'}
        </div>
      </div>
    </div>
  );
}
