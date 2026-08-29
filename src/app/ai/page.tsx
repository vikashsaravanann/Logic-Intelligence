'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, Mic, Loader2 } from 'lucide-react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/config/env";
import { motion } from "framer-motion";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const STARTER_CHIPS = [
  "What is the Business Pro Pack?",
  "Look up the drug Ibuprofen",
  "Search the web for latest Next.js 15 news"
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supabase = createClientComponentClient({
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    fetchSession();
  }, [supabase]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSpeech = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    setInput('');
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: 'user', content: text },
    ]);

    const aiMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: aiMessageId, role: 'assistant', content: '' },
    ]);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      if (!res.body) throw new Error('No readable stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      let aiResponseText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (!dataStr) continue;
            
            try {
              const data = JSON.parse(dataStr);
              if (data.token) {
                aiResponseText += data.token;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, content: aiResponseText }
                      : msg
                  )
                );
              }
            } catch (e) {
              // ignore JSON fragments
            }
          }
        }
      }
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, content: `Error: ${err.message}` }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const userAvatar = session?.user?.user_metadata?.avatar_url;
  const userInitial = session?.user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <div className="flex flex-col h-screen bg-[#0A0F1E] text-zinc-300 font-sans pt-20">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-5xl mx-auto w-full scrollbar-thin scrollbar-thumb-white/10">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#00BFFF] to-[#8A2BE2] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,191,255,0.3)]">
                <Bot size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Logic Intelligence AI</h2>
              <p className="text-sm">Expert Developer Assistant & Database Query Tool</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
              {STARTER_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm text-zinc-300 hover:text-white"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] space-x-4 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                  {msg.role === 'user' ? (
                    userAvatar ? (
                      <img src={userAvatar} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold text-sm">
                        {userInitial}
                      </div>
                    )
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00BFFF] to-[#8A2BE2] flex items-center justify-center shadow-[0_0_10px_rgba(0,191,255,0.3)]">
                      <Bot size={18} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-5 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/30 text-white rounded-tr-sm'
                      : 'bg-white/5 border border-white/10 text-zinc-200 rounded-tl-sm backdrop-blur-sm shadow-xl'
                  }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none">
                    {msg.role === 'user' ? (
                      <p className="m-0 whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <ReactMarkdown>{msg.content || (loading && msg.id === messages[messages.length-1].id ? '...' : '')}</ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 md:p-6 bg-[#0A0F1E] border-t border-white/10 w-full z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto relative">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-2xl p-2 backdrop-blur-md focus-within:border-blue-500/50 transition-colors"
          >
            <button
              type="button"
              onClick={handleSpeech}
              className={`p-3 rounded-xl transition-colors flex items-center justify-center ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'hover:bg-white/10 text-zinc-400 hover:text-white'}`}
              title="Speak"
            >
              <Mic size={20} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI a question..."
              className="flex-1 bg-transparent p-2 focus:outline-none text-white placeholder-zinc-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-gradient-to-r from-[#00BFFF] to-[#0099FF] text-white rounded-xl hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] disabled:opacity-50 transition-all flex items-center justify-center"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </form>
          <div className="text-center mt-3 text-xs text-zinc-500">
            Logic Intelligence AI can make mistakes. Verify important information.
          </div>
        </div>
      </div>
    </div>
  );
}
