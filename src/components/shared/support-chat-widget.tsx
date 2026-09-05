"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/config/company";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const GREETING: ChatMessage = {
  role: "assistant",
  content: `Hi! I'm the ${COMPANY.displayName} support assistant. Ask me about our packages, services, or past work — or share your email to check on a form you submitted.`,
};

export default function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.filter((m) => m !== GREETING).slice(-20) }),
        signal: AbortSignal.timeout(15000),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, something went wrong on my end. You can reach the team directly on WhatsApp or via the contact form.",
          },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection issue — please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close support chat" : "Open support chat"}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-105 mb-safe ${
          open
            ? "w-14 h-14 rounded-full bg-primary text-black shadow-xl shadow-primary/30 flex items-center justify-center"
            : "h-14 pl-2 pr-4 rounded-full bg-[#0A0F1E]/95 border border-primary/40 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,191,255,0.25)] hover:border-primary flex items-center gap-3 text-white group"
        }`}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <div className="w-11 h-11 rounded-full bg-white p-0 flex items-center justify-center shrink-0 shadow-md overflow-hidden border border-white/20">
              <img
                src="/icon.png"
                alt="Logic Intelligence Logo"
                className="w-full h-full object-contain scale-110"
              />
            </div>
            <div className="flex items-center justify-center pr-1 select-none">
              <span className="text-[10px] text-zinc-400 font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                AI Chatbot
              </span>
            </div>
          </>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-[360px] h-[75vh] max-h-[600px] rounded-2xl border border-white/10 bg-[#060B18]/95 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden pb-safe"
          >
            {/* Header */}
            <div className="relative px-5 py-4 bg-gradient-to-r from-[#0A0F1E] to-[#12172B] border-b border-white/10 flex items-center gap-3">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,191,255,0.3)] overflow-hidden border border-white/30">
                <img
                  src="/assets/image.png"
                  alt="Logic Intelligence Technologies"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white flex items-center gap-1.5 truncate">
                  LOGIC INTELLIGENCE TECHNOLOGIES
                </p>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                      m.role === "user"
                        ? "bg-primary text-black rounded-br-sm"
                        : "bg-white/5 text-zinc-200 border border-white/5 rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm flex items-center gap-2 text-zinc-400">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" /> Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#0A0F1E] border-t border-white/5">
              <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 focus-within:border-primary/50 focus-within:bg-white/10 transition-colors shadow-inner">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  rows={1}
                  className="flex-1 max-h-[100px] min-h-[40px] resize-none bg-transparent px-3 py-2.5 text-base md:text-sm text-white placeholder:text-zinc-500 focus:outline-none scrollbar-thin scrollbar-thumb-white/10"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="w-10 h-10 shrink-0 mb-0.5 mr-0.5 rounded-lg bg-gradient-to-br from-primary to-accent text-black flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
              <div className="mt-3 text-center">
                <a
                  href={COMPANY.whatsappGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-[10px] font-semibold rounded-full uppercase transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.59 6.52c-.26.36-.57.57-.91.68a4.5 4.5 0 0 0-.77-.35c-2.19 0-3.55 1.48-3.55 3.65 0 1.24.43 2.43 1.21 3.31a4.57 4.57 0 0 0 1.07.16c.39-.91.77-1.85.77-2.18a4.52 4.52 0 0 0-.36-.77c-.55.15-1.11.3-1.67.35a13.78 13.78 0 0 0-2.24.11c-1.16-.53-2.28-.93-3.19-1.25a4.53 4.53 0 0 0-.77-.56c.48-.39.87-.81 1.19-1.25a4.51 4.51 0 0 0 .36-1.08 4.53 4.53 0 0 0-.6-1.34c-.25 1.06-.35 2.22-.35 3.39 0 2.67 1.53 5.06 3.82 6.33a.5.5 0 0 0 .12-.38c-2.11.7-3.54 2.12-4.3 3.65a4.55 4.55 0 0 0-.32.15c-.76-1.63-1.13-3.4-1.13-5.58 0-2.19 1.37-3.67 3.17-3.67a6.61 6.61 0 0 1 1.98-.06c.79 0 1.53.12 2.27.36.39.13.76.25 1.11.35a13.79 13.79 0 0 0 2.25-.12c.78.07 1.54.2 2.26.36.53.15.85.3 1.11.44a4.53 4.53 0 0 0 1.08-.32 4.51 4.51 0 0 0 .34-1.07c-.16 1.17-.35 2.33-.56 3.44a4.51 4.51 0 0 0-.35 1.33 4.5 4.5 0 0 0-.17 1.18c.01.22.01.45.01.68a6.55 6.55 0 0 0 1.57.07c.98-.5 1.76-.9 2.29-1.23.31.65.48 1.37.48 2.13 0 1.82-.75 3.42-1.85 4.65a4.53 4.53 0 0 0 .76 1.07 13.76 13.76 0 0 1-.6 2.22c-.2 1.28-.5 2.54-.88 3.75a4.54 4.54 0 0 0 1.17.64c.6 0 1.19.12 1.77.36-.66.06-1.27.16-1.86.26a11.96 11.96 0 0 1-1.66-.13 4.51 4.51 0 0 0-.36-.17 4.52 4.52 0 0 0-1.07.0c-1.1 0-2.13-.28-3.09-.81-.56.66-1.23 1.25-1.96 1.74a4.54 4.54 0 0 0-.55.32c-.3 0-.59-.1-.87-.31a12.34 12.34 0 0 1-.08-.65c-.1-.39-.15-.81-.15-1.24a4.55 4.55 0 0 0 1.29-3.88 4.54 4.54 0 0 0 .77-1.18 4.52 4.52 0 0 0-.34-1.06c.19.65.35 1.33.47 2.01a4.54 4.54 0 0 0 .68 1.35zM7.35 11.73a4.55 4.55 0 0 1-.54-.38 4.53 4.53 0 0 1-.06-.83c0-2.21 1.68-3.58 3.82-3.35a4.52 4.52 0 0 1 1.17.25c-.68-.38-1.28-.85-1.72-1.43a12.31 12.31 0 0 0 1.97-2.18 4.54 4.54 0 0 1 1.23-.38c1.05 0 2.05.2 3.03.63a4.52 4.52 0 0 1 .29 1.05c-.6.39-1.07.87-1.35 1.38a12.32 12.32 0 0 0-1.87 2.11c.42.08.83.17 1.23.26a4.5 4.5 0 0 1 .33.83c-.74 1.32-1.62 2.6-2.55 3.77a4.54 4.54 0 0 1-1.73-.75z" />
                  </svg>
                  Prefer a human? Chat on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
