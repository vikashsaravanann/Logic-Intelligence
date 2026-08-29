import { useState, useEffect, useCallback } from 'react';
import { loadTheme, saveTheme } from '../utils/storage';

export function useTheme() {
  const [theme, setTheme] = useState(() => loadTheme());

  useEffect(() => {
    saveTheme(theme);
    // Apply theme to html root for CSS variables to pick up
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme, toggleTheme };
}
