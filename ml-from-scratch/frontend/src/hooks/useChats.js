import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'lit_ai_chats';

function safeParseChats(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Normalize + dedupe by id, drop malformed entries
    const seen = new Set();
    return parsed
      .filter((c) => c && typeof c === 'object' && c.id)
      .filter((c) => {
        if (seen.has(c.id)) return false;
        seen.add(c.id);
        return true;
      })
      .map((c) => ({
        id: String(c.id),
        title: typeof c.title === 'string' ? c.title : 'New chat',
        messages: Array.isArray(c.messages) ? c.messages : [],
        createdAt: typeof c.createdAt === 'number' ? c.createdAt : Date.now(),
      }));
  } catch (e) {
    console.error('Failed to parse stored chats, resetting:', e);
    return [];
  }
}

export function useChats() {
  const [chats, setChats] = useState(() => {
    if (typeof window === 'undefined') return [];
    return safeParseChats(window.localStorage.getItem(STORAGE_KEY));
  });
  const [activeChatId, setActiveChatId] = useState(null);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
      setStorageError(false);
    } catch (e) {
      console.error('Failed to save chats (storage may be full):', e);
      setStorageError(true);
    }
  }, [chats]);

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  const createNewChat = useCallback(() => {
    const newChat = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: 'New chat',
      messages: [],
      createdAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat.id;
  }, []);

  const deleteChat = useCallback(
    (id) => {
      setChats((prev) => prev.filter((c) => c.id !== id));
      if (activeChatId === id) setActiveChatId(null);
    },
    [activeChatId]
  );

  const renameChat = useCallback((id, newTitle) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, title: trimmed.slice(0, 60) } : c)));
  }, []);

  const selectChat = useCallback((id) => {
    setActiveChatId(id);
  }, []);

  const addMessage = useCallback((chatId, message) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== chatId) return c;
        const isFirstMessage = c.messages.length === 0 && message.role === 'user';
        return {
          ...c,
          title: isFirstMessage && c.title === 'New chat' ? message.text.slice(0, 40) : c.title,
          messages: [...c.messages, message],
        };
      })
    );
  }, []);

  const updateLastMessage = useCallback((chatId, updater) => {
    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== chatId || c.messages.length === 0) return c;
        const messages = [...c.messages];
        const last = messages[messages.length - 1];
        messages[messages.length - 1] = updater(last);
        return { ...c, messages };
      })
    );
  }, []);

  const exportChat = useCallback(
    (id, format = 'md') => {
      const chat = chats.find((c) => c.id === id);
      if (!chat) return;

      let content;
      let mimeType;
      let extension;

      if (format === 'md') {
        content = `# ${chat.title}\n\n${chat.messages
          .map((m) => `**${m.role === 'user' ? 'You' : 'Logic AI'}:**\n\n${m.text}\n`)
          .join('\n---\n\n')}`;
        mimeType = 'text/markdown';
        extension = 'md';
      } else {
        content = chat.messages
          .map((m) => `${m.role === 'user' ? 'You' : 'Logic AI'}: ${m.text}`)
          .join('\n\n');
        mimeType = 'text/plain';
        extension = 'txt';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${chat.title.replace(/[^a-z0-9]/gi, '_').slice(0, 40)}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [chats]
  );

  const groupChatsByDate = useCallback(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000;
    const weekAgo = today - 7 * 86400000;

    const groups = { Today: [], Yesterday: [], 'Previous 7 Days': [], Older: [] };

    [...chats]
      .sort((a, b) => b.createdAt - a.createdAt)
      .forEach((chat) => {
        if (chat.createdAt >= today) groups['Today'].push(chat);
        else if (chat.createdAt >= yesterday) groups['Yesterday'].push(chat);
        else if (chat.createdAt >= weekAgo) groups['Previous 7 Days'].push(chat);
        else groups['Older'].push(chat);
      });

    return Object.entries(groups).filter(([, list]) => list.length > 0);
  }, [chats]);

  return {
    chats,
    activeChat,
    activeChatId,
    storageError,
    createNewChat,
    deleteChat,
    renameChat,
    selectChat,
    addMessage,
    updateLastMessage,
    exportChat,
    groupChatsByDate,
  };
}
