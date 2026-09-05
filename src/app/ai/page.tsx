"use client";

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { COMPANY } from '@/config/company';


const STORAGE_KEY = 'lit_ai_chats';

function loadChats() {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load chats:', e);
  }
  return [];
}

function saveChats(chats: any) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  } catch (e) {
    console.error('Failed to save chats:', e);
  }
}

const SUGGESTIONS = [
  { icon: '📦', title: 'Digital Launch Pack', subtitle: 'Rs.8,999 - up to 5 pages, mobile-responsive, basic SEO' },
  { icon: '💼', title: 'Business Pro Pack', subtitle: 'Rs.18,999 - booking system, admin panel, payment gateway' },
  { icon: '🏢', title: 'Enterprise Pack', subtitle: 'custom from Rs.50,000 - dedicated project manager, unlimited pages' },
  { icon: '🔧', title: 'Services Inquiry', subtitle: 'Full stack web, mobile apps, CRM, SEO, hosting & maintenance' },
];

// Brain-circuit logo matching the company brand mark
function BrandLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00bfff" />
          <stop offset="50%" stopColor="#0055ff" />
          <stop offset="100%" stopColor="#001144" />
        </linearGradient>
      </defs>
      <path
        d="M50 12c-9 0-16 6-18 14-7 1-12 7-12 14 0 4 2 8 5 10-2 2-3 5-3 8 0 7 6 13 13 13 1 5 5 9 10 9h10c5 0 9-4 10-9 7 0 13-6 13-13 0-3-1-6-3-8 3-2 5-6 5-10 0-7-5-13-12-14-2-8-9-14-18-14z"
        stroke="url(#brainGrad)"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="55" cy="30" r="2.2" fill="#00bfff" />
      <circle cx="68" cy="38" r="2.2" fill="#0055ff" />
      <circle cx="72" cy="52" r="2.2" fill="#0055ff" />
      <circle cx="60" cy="62" r="2.2" fill="#00bfff" />
      <circle cx="45" cy="68" r="2.2" fill="#00bfff" />
      <path
        d="M55 30 L62 30 L62 38 L68 38 M68 38 L68 46 L72 46 L72 52 M60 62 L60 55 L68 55 M45 68 L45 58 L52 58 L52 48"
        stroke="url(#brainGrad)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function GeminiAiChatPage() {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });
  }, [supabase.auth]);

  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setChats(loadChats());
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMounted) saveChats(chats);
  }, [chats, isMounted]);

  const activeChat = chats.find((c) => c.id === activeChatId);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [input]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New chat',
      messages: [],
      createdAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    if (isMobile) setSidebarOpen(false);
  };

  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  const selectChat = (id: string) => {
    setActiveChatId(id);
    if (isMobile) setSidebarOpen(false);
  };

  const copyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const sendMessage = async (textOverride?: string) => {
    const messageText = (textOverride ?? input).trim();
    if (!messageText || loading) return;

    let chatId = activeChatId;

    if (!chatId) {
      const newChat = {
        id: Date.now().toString(),
        title: messageText.slice(0, 40),
        messages: [],
        createdAt: Date.now(),
      };
      setChats((prev) => [newChat, ...prev]);
      chatId = newChat.id;
      setActiveChatId(chatId);
    }

    setInput('');
    setLoading(true);

    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== chatId) return c;
        const isFirstMessage = c.messages.length === 0;
        return {
          ...c,
          title: isFirstMessage ? messageText.slice(0, 40) : c.title,
          messages: [...c.messages, { role: 'user', text: messageText }],
        };
      })
    );

    try {
      // Use the Next.js API route that hooks up to the Python backend to allow streaming or normal fetching
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageText, max_tokens: 300 }),
      });
      
      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";

      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, { role: 'assistant', text: '' }] } : c
        )
      );

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.replace('data: ', '').trim();
              if (dataStr === '[DONE]') break;
              try {
                const data = JSON.parse(dataStr);
                if (data.token) {
                  fullText += data.token;
                  setChats((prev) =>
                    prev.map((c) => {
                      if (c.id !== chatId) return c;
                      const msgs = [...c.messages];
                      msgs[msgs.length - 1].text = fullText;
                      return { ...c, messages: msgs };
                    })
                  );
                }
              } catch (e) {
                // ignore JSON parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (err) {
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: [
                  ...c.messages.slice(0, -1),
                  { role: 'assistant', text: 'Connection failed. Ensure the AI backend is running.' },
                ],
              }
            : c
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isMounted) return null;

  const showWelcome = !activeChat || activeChat.messages.length === 0;

  return (
    <div className="app-root">
      <style dangerouslySetInnerHTML={{__html: `
        :global(nav), :global(footer), :global(.fixed) { display: none !important; }
        :global(body), :global(html) { overflow: hidden !important; margin: 0; padding: 0; }
        :global(main) { padding: 0 !important; margin: 0 !important; }

        * { box-sizing: border-box; }
        html, body, #root { height: 100%; margin: 0; }

        .app-root {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: #131314;
          color: #E3E3E3;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          overflow: hidden;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 99999;
        }

        /* Ambient animated background glow (subtle for Gemini) */
        .ambient-glow { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes bounce-dot { 0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }

        .chat-bubble { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .welcome-fade { animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .gemini-gradient-text {
          background: linear-gradient(74deg, #4285f4 0%, #9b72cb 46%, #d96570 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        /* --- Sidebar --- */
        .sidebar {
          width: 288px; min-width: 288px;
          background-color: #1E1F20;
          padding: 18px 12px;
          display: flex; flex-direction: column;
          height: 100%;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 100; position: relative;
        }
        .sidebar-brand { display: flex; align-items: center; gap: 12px; padding: 6px 10px 22px 10px; }
        .brand-text-wrap { display: flex; flex-direction: column; line-height: 1.15; }
        .brand-text-main { font-size: 14.5px; font-weight: 700; letter-spacing: 0.4px; color: #E3E3E3; }
        .brand-text-sub { font-size: 9.5px; font-weight: 500; letter-spacing: 1.8px; color: #8E918F; margin-top: 2px; }

        .new-chat-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 16px; border-radius: 22px; border: none;
          background: #282A2C;
          color: #E3E3E3; cursor: pointer; font-size: 13.5px; font-weight: 500;
          margin-bottom: 14px; width: 100%;
          transition: all 0.2s ease;
        }
        .new-chat-btn:hover { background: #333537; }

        .history-list { flex: 1; overflow-y: auto; margin-top: 6px; display: flex; flex-direction: column; gap: 2px; }
        .history-list::-webkit-scrollbar { width: 5px; }
        .history-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .history-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-radius: 22px; cursor: pointer;
          font-size: 13.5px; color: #C4C7C5;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: background-color 0.15s ease;
        }
        .history-item:hover { background-color: #282A2C; }
        .history-item.active { background: #424548; color: #E3E3E3; }
        .history-item-title { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .delete-btn {
          background: none; border: none; color: #8E918F; cursor: pointer;
          padding: 2px 6px; border-radius: 8px; font-size: 14px; opacity: 0;
        }
        .history-item:hover .delete-btn { opacity: 1; }
        .delete-btn:hover { color: #F28B82; }

        /* --- Main area --- */
        .main-area { flex: 1; display: flex; flex-direction: column; position: relative; min-width: 0; z-index: 1; background: #131314; }
        .top-bar {
          padding: 16px 24px; display: flex; align-items: center; justify-content: center; position: relative;
        }
        .hamburger { display: none; background: none; border: none; color: #E8E9EA; font-size: 20px; cursor: pointer; padding: 4px 8px; }

        .message-stream { flex: 1; overflow-y: auto; padding: 26px; max-width: 860px; width: 100%; margin: 0 auto; box-sizing: border-box; }
        .message-stream::-webkit-scrollbar { width: 6px; }
        .message-stream::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        .welcome-screen { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; }
        
        .suggestion-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; max-width: 760px; width: 100%; }
        .suggestion-card {
          background-color: #1E1F20; border-radius: 16px;
          padding: 20px; text-align: left; cursor: pointer; font-size: 14px;
          transition: all 0.2s ease;
          display: flex; flex-direction: column; justify-content: space-between; gap: 12px;
          min-height: 120px;
        }
        .suggestion-card:hover { background-color: #282A2C; transform: translateY(-2px); }
        .suggestion-icon { font-size: 24px; padding-bottom: 8px; }
        .suggestion-card .s-title { color: #E3E3E3; font-weight: 500; font-size: 15px; }
        .suggestion-card .s-subtitle { color: #A0A3A6; font-size: 13px; font-weight: 400; line-height: 1.4; }

        .avatar {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: bold; flex-shrink: 0;
          overflow: hidden;
        }
        .avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .avatar-assistant { background: transparent; }

        /* Professional Markdown Styling */
        .markdown-body { font-size: 15.5px; line-height: 1.6; word-wrap: break-word; color: #E3E3E3; }
        .markdown-body p { margin-top: 0; margin-bottom: 16px; }
        .markdown-body p:last-child { margin-bottom: 0; }
        .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4 { margin-top: 24px; margin-bottom: 12px; font-weight: 600; color: #E3E3E3; }
        .markdown-body ul, .markdown-body ol { margin-top: 0; margin-bottom: 16px; padding-left: 24px; }
        .markdown-body li { margin-bottom: 6px; }
        .markdown-body a { color: #4285f4; text-decoration: none; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body code { background: #282A2C; padding: 2px 6px; border-radius: 4px; font-family: ui-monospace, monospace; font-size: 13.5px; color: #E3E3E3; }
        .markdown-body pre { background: #1E1F20; border-radius: 12px; padding: 16px; overflow-x: auto; margin: 16px 0; }
        .markdown-body pre code { background: transparent; padding: 0; color: #E3E3E3; font-size: 13.5px; }
        
        .message-row { display: flex; gap: 16px; margin-bottom: 32px; width: 100%; }
        .message-row.user { flex-direction: row-reverse; }
        .message-row.user .message-content { display: flex; justify-content: flex-end; width: 100%; }
        .message-row.user .message-text { 
           background: #282A2C; 
           padding: 12px 20px; 
           border-radius: 24px; 
           border-top-right-radius: 4px;
           max-width: 80%;
           display: inline-block;
           font-size: 15.5px;
           color: #E3E3E3;
        }
        .message-content { flex: 1; padding-top: 5px; }
        .message-text { line-height: 1.65; font-size: 14.5px; white-space: pre-wrap; }
        .message-actions {
          display: flex; gap: 8px; margin-top: 8px; opacity: 0; transition: opacity 0.2s ease;
        }
        .message-row:hover .message-actions { opacity: 1; }
        .action-btn {
          background: none; border: 1px solid rgba(255,255,255,0.1); color: #8E918F;
          font-size: 11px; padding: 4px 10px; border-radius: 10px; cursor: pointer;
          transition: all 0.15s ease;
        }
        .action-btn:hover { background-color: rgba(255,255,255,0.05); color: #E8E9EA; border-color: #00bfff; }

        .typing-dots { display: flex; gap: 4px; align-items: center; padding-top: 8px; }
        .typing-dots span {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #00bfff, #0055ff);
          animation: bounce-dot 1.4s infinite ease-in-out both;
        }
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        .input-bar-wrap { padding: 0 26px 22px; max-width: 860px; width: 100%; margin: 0 auto; box-sizing: border-box; position: relative; z-index: 20; }
        .input-bar {
          display: flex; align-items: flex-end; gap: 8px;
          background-color: #1E1F20; border-radius: 32px;
          padding: 12px 12px 12px 24px; border: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          transition: background-color 0.2s ease;
        }
        .input-bar:focus-within { background-color: #282A2C; }
        .input-bar textarea {
          flex: 1; background: transparent; border: none; color: #E3E3E3;
          font-size: 16px; outline: none; resize: none; font-family: inherit;
          max-height: 200px; line-height: 1.5; padding: 6px 0;
        }
        .input-bar textarea::placeholder { color: #A0A3A6; }
        .send-btn {
          background: #E3E3E3; color: #131314; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; font-weight: bold;
          flex-shrink: 0; transition: all 0.2s ease;
        }
        .send-btn:hover:not(:disabled) { transform: scale(1.05); }
        .send-btn:disabled { background: #282A2C; color: #5f6368; cursor: default; }

        .disclaimer { text-align: center; font-size: 11px; color: #6E7175; padding-top: 12px; }

        .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 90; backdrop-filter: blur(2px); }

        @media (max-width: 767px) {
          .sidebar { position: fixed; top: 0; left: 0; bottom: 0; transform: translateX(-100%); box-shadow: 4px 0 24px rgba(0,0,0,0.5); }
          .sidebar.open { transform: translateX(0); animation: slideIn 0.28s ease; }
          .sidebar-overlay.show { display: block; }
          .hamburger { display: block; }
          .welcome-title { font-size: 30px; }
          .welcome-subtitle { font-size: 18px; margin-bottom: 8px; }
          .suggestion-grid { grid-template-columns: 1fr; }
          .message-stream { padding: 16px; }
          .input-bar-wrap { padding: 0 12px 14px; }
          .top-bar { padding: 12px 16px; }
          .top-bar-title span:last-child { display: none; }
        }
        @media (min-width: 768px) {
          .sidebar { position: relative; transform: none; }
        }
      `}} />

      <div className="ambient-glow" />

      <div className={`sidebar-overlay ${sidebarOpen && isMobile ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="logo-float"><BrandLogo size={32} /></div>
          <div className="brand-text-wrap">
            <span className="brand-text-main">LOGIC INTELLIGENCE</span>
            <span className="brand-text-sub">TECHNOLOGIES</span>
          </div>
        </div>

        <button className="new-chat-btn" onClick={createNewChat}>
          <span style={{ fontSize: '16px' }}>+</span> New chat
        </button>

        <div className="history-list">
          {chats.length === 0 && (
            <div style={{ fontSize: '12px', color: '#5F6368', padding: '10px 12px' }}>No conversations yet</div>
          )}
          {chats
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((chat) => (
              <div key={chat.id} className={`history-item ${chat.id === activeChatId ? 'active' : ''}`} onClick={() => selectChat(chat.id)}>
                <span className="history-item-title">{chat.title || 'New chat'}</span>
                <button className="delete-btn" onClick={(e) => deleteChat(chat.id, e)} title="Delete chat">✕</button>
              </div>
            ))}
        </div>

        
      </div>

      {/* Main area */}
      <div className="main-area" style={{ position: 'relative' }}>
        <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="hamburger" onClick={() => setSidebarOpen((s) => !s)}>☰</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={COMPANY.logoIconPath} alt="Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '16px', color: '#E3E3E3', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: '1.2' }}>
                  LOGIC INTELLIGENCE
                </span>
                <span style={{ fontWeight: '500', fontSize: '10px', color: '#8E918F', letterSpacing: '3px', textTransform: 'uppercase', lineHeight: '1' }}>
                  TECHNOLOGIES
                </span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {user?.user_metadata?.avatar_url && (
              <img src={user.user_metadata.avatar_url} alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} title={user?.user_metadata?.full_name || 'User'} />
            )}
            <a href="/" className="px-5 py-2 rounded-full text-[12px] font-medium text-black bg-[#E3E3E3] hover:bg-white transition-all whitespace-nowrap text-decoration-none">
              Exit
            </a>
          </div>
        </div>

        {showWelcome ? (
          <div className="welcome-screen welcome-fade" style={{ justifyContent: 'flex-start', paddingTop: '8vh' }}>
            <div className="welcome-title-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '760px', width: '100%', marginBottom: '48px', paddingLeft: '8px' }}>
              <div className="gemini-gradient-text" style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '500', marginBottom: '8px', letterSpacing: '-1px' }}>
                Hello, {user?.user_metadata?.full_name?.split(' ')[0] || 'there'}
              </div>
              <div style={{ color: '#5f6368', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '500', letterSpacing: '-1px' }}>
                Welcome to the Logic Intelligence Technologies AI Assistant
              </div>
              <div style={{ color: '#8E918F', fontSize: '14px', marginTop: '8px' }}>
                Founded by Vikash Saravanan • Coimbatore, Tamil Nadu, India
              </div>
            </div>
            <div className="suggestion-grid">
              {SUGGESTIONS.map((s, i) => (
                <div key={i} className="suggestion-card" onClick={() => sendMessage(`${s.title} ${s.subtitle}`)}>
                  <span className="suggestion-icon">{s.icon}</span>
                  <div className="s-title">{s.title}</div>
                  <div className="s-subtitle">{s.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="message-stream">
            {activeChat.messages.map((msg: any, idx: number) => (
              <div key={idx} className="chat-bubble message-row">
                <div className={`avatar ${msg.role === 'assistant' ? 'avatar-assistant' : 'avatar-user'}`}>
                  {msg.role === 'assistant' ? (
                    <img src={COMPANY.logoIconPath} alt="AI" />
                  ) : user?.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="User" />
                  ) : (
                    'U'
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text" style={{ color: msg.role === 'assistant' ? '#E8E9EA' : '#C4C7C5', width: '100%' }}>
                    {msg.role === 'assistant' ? (
                      <div className="markdown-body"><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                    ) : (
                      msg.text
                    )}
                  </div>
                  {msg.role === 'assistant' && (
                    <div className="message-actions">
                      <button className="action-btn" onClick={() => copyMessage(msg.text, idx)}>
                        {copiedIdx === idx ? 'Copied ✓' : 'Copy'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble message-row">
                <div className="avatar avatar-assistant ai-pulse">
                  <img src={COMPANY.logoIconPath} alt="AI" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="typing-dots"><span></span><span></span><span></span></div>
                  <span style={{ fontSize: '13px', color: '#00bfff', fontWeight: '500', animation: 'pulse 2s infinite' }}>LOGIC AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        <div className="input-bar-wrap">
          <form onSubmit={handleSubmit} className="input-bar">
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="Ask about pricing, services, or technical development..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="send-btn" disabled={loading || !input.trim()}>↑</button>
          </form>
          <div className="disclaimer">Logic Intelligence AI may display inaccurate info. Verify important details.</div>
        </div>
      </div>
    </div>
  );
}
