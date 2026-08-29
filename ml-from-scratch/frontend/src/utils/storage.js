const STORAGE_KEY = 'lit_ai_chats';
const THEME_KEY = 'lit_ai_theme';

export function loadChats() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    
    // Normalize and prevent duplicate IDs (if any somehow got corrupted)
    const seen = new Set();
    return parsed.filter(chat => {
      if (!chat || !chat.id) return false;
      if (seen.has(chat.id)) return false;
      seen.add(chat.id);
      return true;
    });
  } catch (e) {
    console.error('Failed to load chats from localStorage:', e);
    return [];
  }
}

export function saveChats(chats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    return true;
  } catch (e) {
    console.error('Failed to save chats to localStorage:', e);
    return false;
  }
}

export function loadTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'dark';
  } catch (e) {
    return 'dark';
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // ignore
  }
}
