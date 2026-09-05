"use client";
import { Poppins } from 'next/font/google';
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'], display: 'swap' });

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { COMPANY } from '@/config/company';
import { Rocket, Briefcase, Building2, Wrench, AlertTriangle, Square, Copy, RefreshCcw, Paperclip, Mic, Table, Code2, Calculator, Handshake, CreditCard, Calendar, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';


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
  { icon: <Rocket size={22} className="text-[#8ab4f8]" />, title: 'Get a project quote', subtitle: 'Transparent pricing for websites, apps & AI systems', prompt: 'I need a quote for a custom business website with booking and payments. What package fits and what is the timeline?' },
  { icon: <Briefcase size={22} className="text-[#81c995]" />, title: 'Automate my business', subtitle: 'CRM, workflows, and AI assistants for operations', prompt: 'How can Logic Intelligence Technologies automate lead capture, follow-ups, and reporting for a Coimbatore service business?' },
  { icon: <Building2 size={22} className="text-[#c58af9]" />, title: 'Enterprise AI systems', subtitle: 'RAG, fine-tuned models, and secure deployments', prompt: 'Explain how you build production RAG and LoRA-based AI systems for enterprise clients, including security and hosting.' },
  { icon: <Handshake size={22} className="text-[#fdd663]" />, title: 'Book a free demo', subtitle: 'See a working demo before you pay anything', prompt: 'I want a free demo of a business website. What do you need from me and how does the free-demo process work?' },
];

// Brain-circuit logo matching the company brand mark
function BrandLogo({ size = 28 }: { size?: number | string }) {
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


const ThinkingStatus = ({ activeMessage }: { activeMessage?: string }) => {
  const [tick, setTick] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2500);
    return () => clearInterval(interval);
  }, []);

  const text = activeMessage || "";
  let phase = 0;
  if (text.includes('```')) {
    phase = 3;
  } else if (text.length > 50) {
    phase = 2;
  } else {
    phase = tick % 2;
  }

  const phases = ["Thinking...", "Planning the response...", "Formulating answer...", "Writing code..."];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        className="lit-spin"
        style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(0, 191, 255, 0.2)', borderTopColor: '#00bfff' }} 
      />
      <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center', minWidth: '160px' }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: '13px', color: '#00bfff', fontWeight: '500', position: 'absolute', left: 0, whiteSpace: 'nowrap' }}
          >
            {phases[phase]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function GeminiAiChatPage() {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
const [input, setInput] = useState('');
  const [user, setUser] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<{name: string, type: string, data: string, raw: File} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const [artifact, setArtifact] = useState<{ type: 'table' | 'code', content: any } | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);

  const stopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (user) {
      const fetchChats = async () => {
        const { data: chatData } = await supabase.from('ai_chats').select('*').order('updated_at', { ascending: false });
        if (chatData) {
          const { data: msgData } = await supabase.from('ai_messages').select('*').order('created_at', { ascending: true });
          const mapped = chatData.map(c => ({
            id: c.id,
            title: c.title,
            createdAt: new Date(c.created_at).getTime(),
            messages: (msgData || []).filter(m => m.chat_id === c.id).map(m => ({ role: m.role, text: m.content }))
          }));
          setChats(mapped);
        }
      };
      fetchChats();
    } else {
      setChats(loadChats());
    }
  }, [user, isMounted, supabase]);

  useEffect(() => {
    if (isMounted && !user) saveChats(chats);
  }, [chats, isMounted, user]);

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

  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // 8MB limit
      if (file.size > 8 * 1024 * 1024) {
        toast.error("File size exceeds 8MB limit.");
        e.target.value = '';
        return;
      }

      // Check allowed types
      const allowedTypes = [
        'image/png', 'image/jpeg', 'image/webp', 'application/pdf', 
        'text/plain', 'text/markdown', 'text/javascript', 'text/typescript', 'application/json', 'text/x-python', 'text/csv'
      ];
      
      const isCodeExt = /\.(ts|tsx|js|jsx|py|json|md|csv|txt)$/i.test(file.name);
      
      if (!allowedTypes.includes(file.type) && !isCodeExt) {
        toast.error("Unsupported file type. Please upload images, PDFs, or text/code files.");
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      
      const isText = file.type.startsWith('text/') || file.type === 'application/json' || isCodeExt;
      
      if (isText) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file); // base64 for images and pdfs
      }

      reader.onload = () => {
        let data = reader.result as string;
        if (!isText && data.includes('base64,')) {
           data = data.split('base64,')[1];
        }
        
        setSelectedFile({
          name: file.name,
          type: file.type || (isCodeExt ? 'text/plain' : 'application/octet-stream'),
          data: data,
          raw: file
        });
      };
      
      e.target.value = ''; // Reset input
    }
  };


  const handleExportChat = () => {
    window.print();
  };

  const MarkdownComponents = {
    table: ({ node, ...props }: any) => (
      <div className="artifact-trigger" onClick={() => setArtifact({ type: 'table', content: props.children })}>
        <span className="icon"><Table size={20} className="text-[#00bfff]" /></span>
        <div>
          <div className="title">Interactive Data Table</div>
          <div className="subtitle">Click to view artifact</div>
        </div>
      </div>
    ),
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      
      // Heuristic for large structural code to become artifacts
      if (!inline && (codeString.length > 200 || codeString.includes('<!DOCTYPE') || codeString.includes('<div') || codeString.includes('export default'))) {
        return (
          <div className="artifact-trigger code-artifact" onClick={() => setArtifact({ type: 'code', content: codeString })}>
            <span className="icon"><Code2 size={20} className="text-[#00bfff]" /></span>
            <div>
              <div className="title">Code Preview</div>
              <div className="subtitle">Click to view artifact</div>
            </div>
          </div>
        );
      }

      if (!inline && match) {
        return (
          <div style={{ background: '#1E1F20', borderRadius: '12px', overflow: 'hidden', margin: '16px 0', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#282A2C', padding: '6px 16px', fontSize: '12px', color: '#A0A3A6' }}>
              <span>{match[1]}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(codeString);
                  // Quick visual feedback without needing state for every block
                  const btn = document.activeElement as HTMLButtonElement;
                  if (btn) {
                    const originalText = btn.innerText;
                    btn.innerText = 'Copied!';
                    setTimeout(() => { btn.innerText = originalText; }, 1500);
                  }
                }}
                style={{ background: 'none', border: 'none', color: '#A0A3A6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Copy size={12} /> Copy
              </button>
            </div>
            <pre style={{ margin: 0, padding: '16px', overflowX: 'auto', background: 'transparent' }}>
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          </div>
        );
      }
      return <code className={className} {...props}>{children}</code>;
    },
    pre: ({ children }: any) => <>{children}</>, // Handled entirely inside the code component above for fenced blocks
    a: ({ node, ...props }: any) => <a {...props} target="_blank" rel="noopener noreferrer" />
  };

  const createNewChat = () => {
    const newChat = {
      id: crypto.randomUUID(),
      title: 'New chat',
      messages: [],
      createdAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    if (isMobile) setSidebarOpen(false);
  };

  const deleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
    if (user) {
      await supabase.from('ai_chats').delete().eq('id', id);
    }
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

  const handleRegenerate = async (messageIdx: number) => {
    if (!activeChat) return;
    const msg = activeChat.messages[messageIdx];
    // Find the last user message before this assistant message
    let lastUserMsg = "";
    for (let i = messageIdx - 1; i >= 0; i--) {
      if (activeChat.messages[i].role === 'user') {
         lastUserMsg = activeChat.messages[i].content;
         break;
      }
    }
    if (lastUserMsg) {
      // We will slice the messages array up to the user message
      const cutIdx = activeChat.messages.findIndex((m: any) => m.content === lastUserMsg && m.role === 'user');
      if (cutIdx !== -1) {
         const newMessages = activeChat.messages.slice(0, cutIdx);
         const updatedChat = { ...activeChat, messages: newMessages };
         setChats(chats.map(c => c.id === activeChatId ? updatedChat : c));
         sendMessage(lastUserMsg); // will re-append the user message and fetch
      }
    }
  };

  const sendMessage = async (textOverride?: string) => {
    const messageText = (textOverride ?? input).trim();
    if ((!messageText && !selectedFile) || loading) return;

    let chatId = activeChatId;

    let payloadText = messageText;
    if (selectedFile) {
      payloadText = `[Attached File: ${selectedFile.name}]\n${messageText}`;
    }
    

    if (!chatId) {
      const newId = crypto.randomUUID();
      chatId = newId;
      if (user) {
        await supabase.from('ai_chats').insert({ id: newId, user_id: user.id, title: payloadText.slice(0, 40) });
      }
      const newChat = { id: newId, title: payloadText.slice(0, 40), messages: [], createdAt: Date.now() };
      setChats((prev) => [newChat, ...prev]);
      setActiveChatId(newId);
    }

    setInput('');
    setSelectedFile(null);
    setLoading(true);
    if (user) {
      await supabase.from('ai_messages').insert({ chat_id: chatId, role: 'user', content: payloadText });
    }

    setChats((prev) =>
      prev.map((c) => {
        if (c.id !== chatId) return c;
        const isFirstMessage = c.messages.length === 0;
        return {
          ...c,
          title: isFirstMessage ? payloadText.slice(0, 40) : c.title,
          messages: [...c.messages, { role: 'user', text: payloadText }],
        };
      })
    );

    try {
      abortControllerRef.current = new AbortController();
      // Optimistic empty assistant bubble
      setChats((prev) => prev.map(c => c.id === chatId ? { ...c, messages: [...c.messages, { role: 'assistant', text: '' }] } : c));

      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: payloadText, max_tokens: 800, file: selectedFile ? { name: selectedFile.name, type: selectedFile.type, data: selectedFile.data } : undefined }),
        signal: abortControllerRef.current.signal,
      });

      let fullText = "";
      try {
        const data = await res.json();
        fullText = data?.generated_text || data?.reply || "";
        if (Array.isArray(data?.tool_calls) && data.tool_calls.length > 0) {
          fullText = fullText || "Working on that — one moment.";
        }
        if (!res.ok || (!fullText && !data?.success)) {
          throw new Error(data?.error || `AI request failed (${res.status})`);
        }
      } catch (jsonErr: any) {
        if (jsonErr?.name === 'AbortError') throw jsonErr;
        // If body wasn't JSON (e.g. gateway error page), surface retry UI
        if (!fullText) throw jsonErr;
      }

      if (!fullText.trim()) {
        throw new Error("Empty AI response");
      }

      setChats((prev) =>
        prev.map((c) => {
          if (c.id !== chatId) return c;
          const msgs = [...c.messages];
          msgs[msgs.length - 1] = { role: 'assistant', text: fullText };
          return { ...c, messages: msgs };
        })
      );
      if (user) {
        await supabase.from('ai_messages').insert({ chat_id: chatId, role: 'assistant', content: fullText });
        await supabase.from('ai_chats').update({ updated_at: new Date().toISOString() }).eq('id', chatId);
      }
      } catch (err: any) {
      if (err.name === 'AbortError') {
        // Just stop generating, keep what we have
      } else {
        setChats((prev) =>
          prev.map((c) =>
            c.id === chatId
              ? { ...c, messages: [...c.messages.slice(0, -1), { role: 'assistant', text: '', isError: true, previousUserText: payloadText }] }
              : c
          )
        );
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const speakText = (text: string, idx: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    // Toggle off if already speaking this message
    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingIdx(null);
      return;
    }
    // Stop any existing speech
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 1000));
    utterance.onstart = () => { setIsSpeaking(true); setSpeakingIdx(idx); };
    utterance.onend = () => { setIsSpeaking(false); setSpeakingIdx(null); };
    utterance.onerror = () => { setIsSpeaking(false); setSpeakingIdx(null); };
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setSpeakingIdx(null);
  };

  const toggleListen = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (isListening) {
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    setIsListening(true);
    recognition.start();
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

  return (
    <div className="app-root">
      <style dangerouslySetInnerHTML={{__html: `
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

        @keyframes lit-spin { to { transform: rotate(360deg); } }
        .lit-spin { animation: lit-spin 1s linear infinite; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .lit-spin { animation: none; } }
        .typing-dots { display: flex; gap: 4px; align-items: center; padding-top: 8px; }
        .typing-dots span {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #00bfff, #0055ff);
          animation: bounce-dot 1.4s infinite ease-in-out both;
        }
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
        .typing-dots span:nth-child(3) { animation-delay: 0s; }

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

        .stop-btn {
          background: #F28B82; color: #131314; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s ease;
        }
        .stop-btn:hover { background: #E07B72; transform: scale(1.05); }

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

      <div className="ambient-glow" aria-hidden>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(70vw, 640px)',
            height: 'min(70vw, 640px)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,191,255,0.06) 0%, rgba(0,85,255,0.03) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className={`sidebar-overlay ${sidebarOpen && isMobile ? 'show' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <AnimatePresence>
        {(!isMobile || sidebarOpen) && (
          <motion.div 
            initial={isMobile ? { x: '-100%' } : { x: 0 }}
            animate={{ x: 0 }}
            exit={isMobile ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className={`sidebar ${sidebarOpen ? 'open' : ''}`}
          >
            <div className="sidebar-brand" style={{ padding: '24px 24px 16px 24px' }}>
          <img src="/assets/image.png" alt="Logic Intelligence Technologies" style={{ height: '38px', width: '100%', objectFit: 'contain', objectPosition: 'left center' }} />
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

        
        </motion.div>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="main-area" style={{ position: 'relative' }}>
        <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="hamburger" onClick={() => setSidebarOpen((s) => !s)}>☰</button>
            <div className="top-bar-title" style={{ display: isMobile ? 'flex' : 'none', alignItems: 'center' }}>
              <img src="/assets/image.png" alt="Logic Intelligence Technologies" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
          
          <div className="top-bar-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            {activeChat?.messages.length > 0 && (
               <button onClick={handleExportChat} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                 Export PDF
               </button>
            )}
            {user ? (
              <a href="/dashboard">
                {(user.user_metadata?.avatar_url || user.user_metadata?.picture) ? (
                  <img src={user.user_metadata.avatar_url || user.user_metadata.picture} alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer' }} title="Go to Dashboard" />
                ) : (
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#282A2C', color: '#E3E3E3', fontWeight: 'bold' }}>
                    {user.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </a>
            ) : null}
            <a href="/" className="px-5 py-2 rounded-full text-[12px] font-medium text-black bg-[#E3E3E3] hover:bg-white transition-all whitespace-nowrap text-decoration-none">
              <ArrowLeft size={14} className="inline-block mr-1" /> Back to Home</a>
          </div>
        </div>

        {(!activeChat || activeChat.messages.length === 0) ? (
          <div className="welcome-screen welcome-fade" style={{ justifyContent: 'center', paddingTop: '4vh', paddingBottom: '2vh' }}>
            <div className="welcome-title-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '720px', width: '100%', marginBottom: '36px' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  background: 'linear-gradient(135deg, rgba(0,191,255,0.15), rgba(0,85,255,0.25))',
                  border: '1px solid rgba(0,191,255,0.25)',
                }}
              >
                <BrandLogo size={32} />
              </div>
              <div className={`gemini-gradient-text ${poppins.className}`} style={{ fontSize: 'clamp(34px, 5.5vw, 52px)', fontWeight: 600, marginBottom: 10, letterSpacing: '-1.5px', lineHeight: 1.15 }}>
                Hello{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}
              </div>
              <div className={poppins.className} style={{ color: '#e3e3e3', fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 500, letterSpacing: '-0.4px', maxWidth: 560 }}>
                How can LIT AI help your business today?
              </div>
              <p style={{ color: '#9aa0a6', fontSize: 15, marginTop: 14, lineHeight: 1.55, maxWidth: 520 }}>
                Scope projects, compare packages, plan automations, or draft a free-demo brief — built for founders and operators in Coimbatore and beyond.
              </p>
            </div>
            <div className="suggestion-grid">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="suggestion-card"
                  onClick={() => sendMessage(s.prompt)}
                  style={{ textAlign: 'left', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span className="suggestion-icon">{s.icon}</span>
                  <div className="s-title">{s.title}</div>
                  <div className="s-subtitle">{s.subtitle}</div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 640 }}>
              {['Pricing', 'Free demo', 'RAG systems', 'Next.js apps', 'WhatsApp'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setInput((prev) => (prev ? `${prev} ${chip}` : `Tell me about ${chip} at Logic Intelligence Technologies`));
                    textareaRef.current?.focus();
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#c4c7c5',
                    borderRadius: 999,
                    padding: '8px 14px',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="message-stream">
            <AnimatePresence initial={false}>
            {activeChat.messages.map((msg: any, idx: number) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 12, scale: 0.98 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className={`chat-bubble message-row ${msg.role === 'user' ? 'user' : ''}`}
              >
                <div className={`avatar ${msg.role === 'assistant' ? 'avatar-assistant' : 'avatar-user'}`}>
                  {msg.role === 'assistant' ? (
                    <img src={COMPANY.logoIconPath} alt="AI" />
                  ) : user?.user_metadata?.avatar_url || user?.user_metadata?.picture ? (
                    <img src={user.user_metadata.avatar_url || user.user_metadata.picture} alt="User" />
                  ) : (
                    user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || 'U'
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text" style={{ color: msg.role === 'assistant' ? '#E8E9EA' : '#C4C7C5', width: '100%' }}>
                    {msg.role === 'assistant' ? (
                      msg.isError ? (
                        <div style={{ color: '#F28B82', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <AlertTriangle size={18} />
                          <span>Connection failed.</span>
                          <button onClick={() => sendMessage(msg.previousUserText)} style={{ marginLeft: '12px', background: 'rgba(242, 139, 130, 0.1)', border: '1px solid #F28B82', color: '#F28B82', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <RefreshCcw size={14} /> Retry
                          </button>
                        </div>
                      ) : (
                      <div className="markdown-body">
                        <ReactMarkdown components={MarkdownComponents}>{msg.text.replace(/\[QUOTE_BUILDER\]/g, '').replace(/\[HUMAN_HANDOFF\]/g, '').replace(/\[CHECKOUT:.*?\]/g, '').replace(/\[CALENDAR\]/g, '')}</ReactMarkdown>
                        {msg.text.includes('[QUOTE_BUILDER]') && (
                           <div className="artifact-trigger code-artifact" onClick={() => setArtifact({ type: 'table', content: (
                             <div style={{ padding: '20px', background: '#fff', color: '#000', borderRadius: '8px' }}>
                               <h3>Custom Project Estimator</h3>
                               <p>Drag the sliders below to estimate your project cost.</p>
                               <div style={{ margin: '20px 0' }}>
                                 <label>Number of Pages: <input type="range" min="1" max="50" defaultValue="5" style={{ width: '100%' }} /></label>
                                 <br/><br/>
                                 <label><input type="checkbox" /> Add E-Commerce (+₹25,000)</label>
                                 <br/>
                                 <label><input type="checkbox" /> Add SEO Optimization (+₹10,000)</label>
                               </div>
                               <button type="button" style={{ background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => toast.success('Proposal requested. Our team will contact you shortly.')}>Request Final Proposal</button>
                             </div>
                           ) })}>
                             <span className="icon"><Calculator size={20} className="text-[#00bfff]" /></span>
                             <div>
                               <div className="title">Interactive Quote Builder</div>
                               <div className="subtitle">Click to calculate pricing</div>
                             </div>
                           </div>
                        )}
                        {msg.text.includes('[HUMAN_HANDOFF]') && (
                           <div className="artifact-trigger code-artifact" onClick={async () => {
                             if (!user) {
                               toast.error('Please sign in to create a support ticket.');
                               return;
                             }
                             const { error } = await supabase.from('support_tickets').insert({ user_id: user.id, subject: 'Escalated from AI Chat', message: 'User requested human assistance via AI chat.', status: 'Open' });
                             if (error) {
                               toast.error('Could not create the ticket. Please use WhatsApp or the contact form.');
                               return;
                             }
                             toast.success('Support ticket created. Vikash will review it shortly.');
                           }}>
                             <span className="icon"><Handshake size={20} className="text-[#00bfff]" /></span>
                             <div>
                               <div className="title">Live Support Handoff</div>
                               <div className="subtitle">Click to escalate to Vikash</div>
                             </div>
                           </div>
                        )}
                        {msg.text.includes('[CHECKOUT:') && (
                           <div className="artifact-trigger code-artifact" onClick={() => {
                             window.location.href = '/contact';
                           }}>
                             <span className="icon"><CreditCard size={20} className="text-[#00bfff]" /></span>
                             <div>
                               <div className="title">Secure Checkout</div>
                               <div className="subtitle">Pay Advance via Stripe / Razorpay</div>
                             </div>
                           </div>
                        )}
                        {msg.text.includes('[CALENDAR]') && (
                           <div className="artifact-trigger code-artifact" onClick={() => setArtifact({ type: 'table', content: (
                             <div style={{ padding: '20px', background: '#fff', color: '#000', borderRadius: '8px', height: '100%', minHeight: '500px' }}>
                               <h3>Schedule a Strategy Call</h3>
                               <iframe src="https://calendly.com/" width="100%" height="100%" frameBorder="0" style={{ minHeight: '450px' }}></iframe>
                             </div>
                           ) })}>
                             <span className="icon"><Calendar size={20} className="text-[#00bfff]" /></span>
                             <div>
                               <div className="title">Book a Meeting</div>
                               <div className="subtitle">Schedule a Google Meet with our team</div>
                             </div>
                           </div>
                        )}
                      </div>
                      )
                    ) : (
                      msg.text
                    )}
                  </div>
                  {msg.role === 'assistant' && (
                    <div className="message-actions">
                      <button className="action-btn" onClick={() => copyMessage(msg.text, idx)}>
                        {copiedIdx === idx ? 'Copied ✓' : 'Copy'}
                      </button>
                      <button
                        className="action-btn"
                        title={speakingIdx === idx ? 'Stop speaking' : 'Listen to this message'}
                        onClick={() => speakText(msg.text.replace(/[#*`>_~]/g, ''), idx)}
                        style={speakingIdx === idx ? { borderColor: '#00bfff', color: '#00bfff' } : {}}
                      >
                        {speakingIdx === idx ? '⏹ Stop' : '🔊 Listen'}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            </AnimatePresence>

            {loading && (
              <div className="chat-bubble message-row assistant">
                <div className="avatar avatar-assistant ai-pulse">
                  <img src={COMPANY.logoIconPath} alt="AI" />
                </div>
                <ThinkingStatus activeMessage={activeChat?.messages[activeChat.messages.length - 1]?.text} />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        <div className="input-bar-wrap">
          <form onSubmit={handleSubmit} className="input-bar">
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
            <button type="button" onClick={() => fileInputRef.current?.click()} title="Attach File" style={{ background: 'transparent', border: 'none', color: selectedFile ? '#00bfff' : '#A0A3A6', cursor: 'pointer', padding: '0 8px 6px 0', fontSize: '20px', transition: 'color 0.2s' }}><Paperclip size={18} /></button>
            <button type="button" onClick={toggleListen} title="Voice Input" style={{ background: 'transparent', border: 'none', color: isListening ? '#f44336' : '#A0A3A6', cursor: 'pointer', padding: '0 8px 6px 0', fontSize: '20px', transition: 'color 0.2s' }}><Mic size={18} /></button>
            {selectedFile && (
              <div style={{ position: 'absolute', bottom: '100%', left: '0', marginBottom: '8px', background: '#2A2C2E', padding: '6px 12px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#E3E3E3', border: '1px solid #3E4042' }}>
                <Paperclip size={14} />
                <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selectedFile.name}</span>
                <button type="button" onClick={() => setSelectedFile(null)} style={{ background: 'transparent', border: 'none', color: '#A0A3A6', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '2px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            )}
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder={selectedFile ? `Attached: ${selectedFile.name}` : "Ask about pricing, services, or technical development..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {loading ? (
              <button type="button" onClick={stopGenerating} className="stop-btn" title="Stop generating">
                <Square size={16} fill="currentColor" />
              </button>
            ) : (
              <button type="submit" className="send-btn" disabled={!input.trim() && !selectedFile}>↑</button>
            )}
          </form>
            <div style={{ textAlign: 'center', fontSize: '11px', color: '#52525B', marginTop: '6px', marginBottom: '8px' }}>
              Enter to send • Shift+Enter for a new line
            </div>
          <div className="disclaimer">Logic Intelligence AI may display inaccurate info. Verify important details.</div>
        </div>
      </div>

      {/* Artifact Pane */}
      <div className={`artifact-pane ${artifact ? 'open' : ''}`}>
        <div className="artifact-header">
          <div className="artifact-title">{artifact?.type === 'table' ? 'Interactive Data Table' : 'Code Preview'}</div>
          <button className="artifact-close" onClick={() => setArtifact(null)}>✕</button>
        </div>
        <div className="artifact-content markdown-body">
          {artifact?.type === 'table' && <table>{artifact.content}</table>}
          {artifact?.type === 'code' && (
             artifact.content.includes('<div') || artifact.content.includes('<html') 
              ? <iframe srcDoc={artifact.content} style={{ width: '100%', height: '100%', border: 'none', background: '#fff', borderRadius: '8px' }} />
              : <pre><code>{artifact.content}</code></pre>
          )}
        </div>
      </div>
    </div>
  );
}
