"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, RotateCcw, ArrowUpRight, Sparkles } from "lucide-react";
import { QUOTE_URL } from "@/lib/data";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  model?: string;
  fallbackUsed?: boolean;
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hi! I'm VCAN 3D's AI assistant. How can I help you with 3D printing, rapid prototyping, or our manufacturing services today?",
};

// how long the "VCAN AI / Ask anything" label stays visible before it collapses (ms)
const LABEL_VISIBLE_MS = 1000;

const SUGGESTIONS = [
  "Which 3D printing process is right for my part?",
  "FDM vs SLA vs SLS: what's the difference?",
  "I need 100 parts. What are my options?",
  "How does vacuum casting work?",
];

/**
 * VCAN 3D AI robot mark: friendly robot face (clearly a chatbot).
 * Eyes use the brand saffron + green; they blink now and then.
 * Sits on the saffron -> india gradient.
 */
function VcanAIIcon({ className = "" }: { className?: string }) {
  const blink = {
    attributeName: "ry",
    values: "2.5;2.5;0.3;2.5;2.5",
    keyTimes: "0;0.9;0.94;0.98;1",
    dur: "4s",
    repeatCount: "indefinite",
  };
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      {/* antenna */}
      <rect x="23.2" y="8.5" width="1.6" height="5" rx=".8" fill="#fff" />
      <circle cx="24" cy="7.2" r="2.3" fill="#fff" className="animate-pulse" />
      {/* ears */}
      <rect x="6.5" y="22" width="4" height="8" rx="2" fill="#fff" fillOpacity=".85" />
      <rect x="37.5" y="22" width="4" height="8" rx="2" fill="#fff" fillOpacity=".85" />
      {/* head */}
      <rect x="10.5" y="13" width="27" height="22" rx="8.5" fill="#fff" />
      {/* screen face */}
      <rect x="14" y="17" width="20" height="14" rx="5.5" className="fill-navy-dark" />
      {/* eyes */}
      <ellipse cx="20" cy="23" rx="2.1" ry="2.5" className="fill-saffron">
        <animate {...blink} />
      </ellipse>
      <ellipse cx="28" cy="23" rx="2.1" ry="2.5" className="fill-india">
        <animate {...blink} />
      </ellipse>
      {/* smile */}
      <path d="M21 27.2q3 2.3 6 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      {/* body */}
      <rect x="16.5" y="36.5" width="15" height="5" rx="2.5" fill="#fff" fillOpacity=".7" />
    </svg>
  );
}

function Avatar({ size = "h-8 w-8" }: { size?: string }) {
  return (
    <div className={`${size} flex-none rounded-full bg-saffron shadow-md shadow-saffron/20`}>
      <VcanAIIcon className="h-full w-full" />
    </div>
  );
}

// Markdown component with custom styling
function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-saffron">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-white/90">{children}</li>,
        code: ({ node, inline, className, children, ...props }: any) => {
          if (inline) {
            return (
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-[13px] font-mono text-saffron" {...props}>
                {children}
              </code>
            );
          }
          return (
            <code className="block rounded-lg bg-white/5 p-3 text-[13px] font-mono" {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="mb-2 overflow-x-auto rounded-lg bg-white/5 p-3 text-[13px] font-mono">
            {children}
          </pre>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-saffron underline transition hover:text-saffron/80"
          >
            {children}
          </a>
        ),
        h1: ({ children }) => <h1 className="mb-2 text-base font-bold text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-2 text-sm font-bold text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-2 text-sm font-semibold text-white">{children}</h3>,
        blockquote: ({ children }) => (
          <blockquote className="mb-2 border-l-2 border-saffron/50 pl-3 italic text-white/70">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [labelOpen, setLabelOpen] = useState(true); // launcher label expanded?
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFresh = messages.length === 1;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // show the launcher label briefly on load, then collapse to the round icon
  useEffect(() => {
    const t = setTimeout(() => setLabelOpen(false), LABEL_VISIBLE_MS);
    return () => clearTimeout(t);
  }, []);

  // focus the input when the window opens; Esc closes it
  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const userMessage = (text ?? input).trim();
    if (!userMessage || isLoading) return;

    setInput("");
    const history = messages;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          model: data.model,
          fallbackUsed: data.fallbackUsed,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at sales@vcan3d.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    if (isLoading) return;
    setMessages([WELCOME]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <>
      {/* ---------- Launcher ---------- */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat assistant"}
        aria-expanded={isOpen}
        onMouseEnter={() => setLabelOpen(true)}
        onMouseLeave={() => setLabelOpen(false)}
        className="group fixed bottom-5 right-3.5 z-[65] flex items-center rounded-full bg-navy-dark p-1.5 shadow-2xl shadow-black/30 ring-1 ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:ring-saffron/50"
      >
        {/* label: shows briefly, then slides away to the left, leaving only the round icon */}
        <span
          aria-hidden={isOpen || !labelOpen}
          className={`overflow-hidden whitespace-nowrap text-left leading-tight transition-all duration-500 ease-in-out ${
            !isOpen && labelOpen ? "mr-3 max-w-[12rem] pl-4 opacity-100" : "mr-0 max-w-0 pl-0 opacity-0"
          }`}
        >
          <span className="block text-sm font-bold text-white">VCAN AI</span>
          <span className="block text-xs text-white/60">Ask anything</span>
        </span>

        <span className="relative h-12 w-12 flex-none sm:h-14 sm:w-14">
          <span className="grid h-full w-full place-items-center rounded-full bg-saffron text-white shadow-lg shadow-saffron/30 transition-transform duration-300 group-hover:scale-105">
            {isOpen ? <X className="h-6 w-6" /> : <VcanAIIcon className="h-full w-full" />}
          </span>
          {!isOpen && (
            <span className="absolute -bottom-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-navy-dark bg-white px-1 text-[9px] font-extrabold leading-none text-navy">
              AI
            </span>
          )}
        </span>

      </button>

      {/* ---------- Chat window ---------- */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="VCAN 3D AI Assistant"
          className="fixed bottom-32 right-5 z-[30] flex h-[60vh] max-h-[500px] w-[calc(100%-2.5rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-dark shadow-2xl shadow-black/40 sm:bottom-36 sm:h-[65vh] sm:max-h-[600px] sm:w-[380px]"
        >
          {/* Header */}
          <div className="relative overflow-hidden border-b border-white/10 px-4 py-4 sm:px-5">
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-saffron/25 blur-3xl" />
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-india/25 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-saffron" />

            <div className="relative flex items-center gap-3">
              <Avatar size="h-11 w-11" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-base font-bold text-white sm:text-lg">
                  VCAN 3D AI Assistant
                </h3>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-india opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-india" />
                  </span>
                  AI-powered · Online
                </p>
              </div>
              {!isFresh && (
                <button
                  onClick={resetChat}
                  className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                  aria-label="Start a new chat"
                  title="New chat"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4 sm:px-4 scrollbar-hide">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "assistant" && <Avatar />}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-saffron text-white shadow-md shadow-saffron/10"
                      : "rounded-bl-md border border-white/10 bg-white/[.07] text-white/90"
                  }`}
                >
                  {msg.role === "assistant" ? <MarkdownContent content={msg.content} /> : msg.content}
                </div>
              </div>
            ))}

            {/* Suggested questions on a fresh chat */}
            {isFresh && !isLoading && (
              <div className="pl-[2.625rem] pt-1">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-white/50">
                  <Sparkles className="h-3.5 w-3.5 text-saffron" /> Try asking
                </p>
                <div className="flex flex-col items-start gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-2xl border border-saffron/30 bg-saffron/[.07] px-3.5 py-2 text-left text-[13px] leading-snug text-white/90 transition hover:border-saffron hover:bg-saffron/15"
                    >
                      {s}
                    </button>
                  ))}
                  <a
                    href={QUOTE_URL}
                    target="_blank"
                    rel="noopener"
                    className="mt-1 inline-flex items-center gap-1.5 rounded-2xl border border-india/40 bg-india/10 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:border-india hover:bg-india/20"
                  >
                    Get a quote <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-end gap-2.5">
                <Avatar />
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[.07] px-4 py-3.5">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 animate-bounce rounded-full bg-saffron"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 bg-navy-dark/60 px-3 pb-3 pt-3 backdrop-blur-sm sm:px-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-4 pr-1.5 transition focus-within:border-saffron/60 focus-within:ring-1 focus-within:ring-saffron/40">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask our AI anything..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none sm:text-base"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="grid h-10 w-10 flex-none place-items-center rounded-full bg-saffron text-white transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-white/40">
              AI can make mistakes. For exact quotes, contact sales@vcan3d.com
            </p>
          </div>
        </div>
      )}
    </>
  );
}