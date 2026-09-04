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
        body: JSON.stringify({ messages: nextMessages.filter((m) => m !== GREETING) }),
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 transition-transform mb-safe"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,191,255,0.2)]">
                <div className="w-full h-full bg-[#060B18] rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                  AI Assistant <Sparkles className="w-3 h-3 text-accent" />
                </p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
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
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
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
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500 hover:text-[#25D366] transition-colors uppercase tracking-widest"
                >
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
