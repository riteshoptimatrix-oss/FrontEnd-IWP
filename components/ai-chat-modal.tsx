"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { m, AnimatePresence, type Variants } from "framer-motion";
import {
  X,
  MessageSquarePlus,
  Send,
  Paperclip,
  User,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { knowledgeResolver } from "@/lib/knowledge-engine";
import { useAuthStore } from "@/lib/auth-store";

// --- Types ---
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  uiType?: string;
  payload?: any;
  isTypingComplete?: boolean;
};

// --- Sound Architecture (Disabled by default, ready for future) ---
const playSound = (type: "send" | "receive" | "typing") => {
  // Frontend architecture ready for future sound effects.
  // const audio = new Audio(`/sounds/${type}.mp3`);
  // audio.volume = 0.5;
  // audio.play().catch(() => {});
};

// --- Typewriter Component ---
const TypewriterText = ({ 
  text, 
  onComplete, 
  onTick 
}: { 
  text: string; 
  onComplete: () => void;
  onTick: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    
    // Natural typing speed varies (between 10ms and 30ms per char)
    const typeNext = () => {
      if (index >= text.length) {
        onComplete();
        return;
      }
      
      setDisplayedText(text.substring(0, index + 1));
      index++;
      onTick(); // Trigger auto-scroll on every tick
      
      const nextDelay = 15 + Math.random() * 20; // Natural variance
      setTimeout(typeNext, nextDelay);
    };

    const initialDelay = setTimeout(typeNext, 50); // Small pause before first char
    return () => clearTimeout(initialDelay);
  }, [text]); // Omitting callbacks to avoid re-triggering

  return <span>{displayedText}</span>;
};

// --- Dummy Data & Suggestions ---
const SUGGESTED_QUESTIONS = [
  "Show projects",
  "Show services",
  "Industries",
  "About company",
  "Contact us",
  "FAQ",
  "Resources",
  "Help support"
];

// --- Animations ---
const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 25, stiffness: 300, duration: 0.4 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    filter: "blur(10px)",
    transition: { duration: 0.2 }
  }
};

const userBubbleVariants: Variants = {
  hidden: { opacity: 0, x: 20, scale: 0.95, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 400, damping: 30 }
  }
};

const aiBubbleVariants: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.95, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 400, damping: 30 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 30 }
  }
};

// --- Component ---
interface AiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function AiChatModal({ isOpen, onClose, initialQuery = "" }: AiChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { user } = useAuthStore();
  const initials = user?.full_name ? user.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2) : "U";

  // Smooth Auto Scroll
  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth"
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setInputValue(initialQuery);
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, initialQuery]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    playSound("send");
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Human-like timing logic
    const resolveData = knowledgeResolver(text);
    const contentLength = resolveData.content.length;
    
    // Very short: 300-600ms, Medium: 800-1500ms, Large: 1500-2500ms
    let thinkingDelay = 500;
    if (contentLength < 50) {
      thinkingDelay = 300 + Math.random() * 300;
    } else if (contentLength < 150) {
      thinkingDelay = 800 + Math.random() * 700;
    } else {
      thinkingDelay = 1500 + Math.random() * 1000;
    }

    setTimeout(() => {
      setIsTyping(false);
      playSound("receive");
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: resolveData.content,
        uiType: resolveData.uiType,
        payload: resolveData.payload,
        timestamp: new Date(),
        isTypingComplete: false
      };
      setMessages((prev) => [...prev, newAiMsg]);
    }, thinkingDelay);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue("");
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const markTypingComplete = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isTypingComplete: true } : m))
    );
    // Extra scroll when cards appear
    setTimeout(scrollToBottom, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-slate-900/40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex w-full max-w-[900px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 h-[85vh] max-h-[800px]"
          >
            {/* HEADER */}
            <div className="relative flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-white z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <m.div 
                  className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 shadow-sm"
                  animate={isTyping ? { scale: [1, 1.05, 1], boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 15px rgba(59,130,246,0.5)", "0px 0px 0px rgba(0,0,0,0)"] } : {}}
                  transition={{ repeat: isTyping ? Infinity : 0, duration: 2 }}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" title="Online" />
                </m.div>
                <div>
                  <h2 id="modal-title" className="text-sm font-semibold text-slate-800">
                    IndiaWebProgrammers AI
                  </h2>
                  <m.p 
                    className="text-xs font-medium text-slate-500"
                    animate={isTyping ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {isTyping ? "Thinking..." : "Always online"}
                  </m.p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNewChat}
                  className="flex h-9 items-center gap-2 rounded-full px-3 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label="New chat"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span className="hidden sm:inline">New Chat</span>
                </button>
                <div className="h-4 w-px bg-slate-200" />
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div 
              ref={scrollContainerRef}
              className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 custom-scrollbar z-10 scroll-smooth"
            >
              {messages.length === 0 ? (
                // PREMIUM ONBOARDING (WELCOME SCREEN)
                <m.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex h-full flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-8 pb-10"
                >
                  <div className="space-y-4">
                    <m.div 
                      className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50 border border-slate-200 shadow-sm"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                      <Sparkles className="h-10 w-10 text-slate-800" />
                    </m.div>
                    <div>
                      <h3 className="text-3xl font-semibold text-slate-800 tracking-tight">
                        How can I help you today?
                      </h3>
                      <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">
                        Ask me anything about IndiaWebProgrammers. I can guide you through our services, portfolio, and expertise.
                      </p>
                    </div>
                  </div>

                  <m.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid w-full grid-cols-2 gap-3 sm:gap-4 mt-8"
                  >
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <m.button
                        key={i}
                        variants={staggerItem}
                        onClick={() => handleSend(q)}
                        className="group relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <span className="relative z-10">{q}</span>
                      </m.button>
                    ))}
                  </m.div>
                </m.div>
              ) : (
                // CHAT INTERFACE
                <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
                  {messages.map((msg) => (
                    <m.div
                      key={msg.id}
                      variants={msg.role === "user" ? userBubbleVariants : aiBubbleVariants}
                      initial="hidden"
                      animate="visible"
                      className={cn(
                        "flex w-full",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "relative flex max-w-[85%] sm:max-w-[75%] gap-3",
                          msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        )}
                      >
                        {/* Avatar */}
                        <div className="mt-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 border border-slate-200/60 shadow-sm overflow-hidden text-xs font-bold text-slate-600">
                          {msg.role === "user" ? (
                            user?.avatar ? (
                              <img src={user.avatar} alt="User" className="h-full w-full object-cover" />
                            ) : (
                              initials
                            )
                          ) : (
                            <Sparkles className="h-4 w-4 text-blue-600" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div className="flex flex-col gap-1 w-full overflow-hidden">
                          <div
                            className={cn(
                              "rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap",
                              msg.role === "user"
                                ? "bg-slate-100 text-slate-900 border border-slate-200 rounded-br-sm"
                                : "bg-white border border-slate-100 text-slate-700 rounded-bl-sm"
                            )}
                          >
                            {msg.role === "assistant" && !msg.isTypingComplete ? (
                              <TypewriterText 
                                text={msg.content} 
                                onComplete={() => markTypingComplete(msg.id)}
                                onTick={scrollToBottom}
                              />
                            ) : (
                              msg.content
                            )}

                            {/* Rich UI Rendering based on uiType - Staggered Appearance */}
                            {msg.role === "assistant" && msg.uiType && msg.payload && msg.isTypingComplete && (
                              <m.div 
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="mt-4 flex flex-col gap-3"
                              >
                                {msg.uiType === "portfolio-cards" && msg.payload.map((item: any, i: number) => (
                                  <m.div variants={staggerItem} key={i} className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                    {item.image && (
                                      <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg bg-slate-200">
                                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                                      <Briefcase className="w-4 h-4" />
                                      {item.client}
                                    </div>
                                    <h4 className="font-medium text-slate-800 text-[15px]">{item.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                                    <div className="mt-2 text-[11px] font-bold text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-full">
                                      {item.metric}
                                    </div>
                                  </m.div>
                                ))}

                                {msg.uiType === "services-cards" && msg.payload.map((item: any, i: number) => (
                                  <m.div variants={staggerItem} key={i} className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                    <h4 className="font-medium text-blue-900 text-[15px]">{item.title}</h4>
                                    <p className="text-sm text-blue-700/80 mt-1">{item.description}</p>
                                  </m.div>
                                ))}

                                {msg.uiType === "industries-cards" && msg.payload.map((item: any, i: number) => (
                                  <m.div variants={staggerItem} key={i} className="rounded-xl border border-purple-100 bg-purple-50/50 p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                    <h4 className="font-medium text-purple-900 text-[15px]">{item.industry}</h4>
                                    <p className="text-sm text-purple-700/80 mt-1">{item.description}</p>
                                  </m.div>
                                ))}

                                {msg.uiType === "about-card" && (
                                  <m.div variants={staggerItem} className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 text-center hover:shadow-md transition-shadow">
                                    <div className="mx-auto w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                                      <Sparkles className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900">{msg.payload.company}</h3>
                                    <p className="text-sm font-medium text-blue-600 my-1">{msg.payload.mission}</p>
                                    <p className="text-sm text-slate-600 mt-2">{msg.payload.description}</p>
                                    <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                                      <span>Est. {msg.payload.founded}</span>
                                      <span>•</span>
                                      <span>{msg.payload.headquarters}</span>
                                    </div>
                                  </m.div>
                                )}

                                {msg.uiType === "contact-card" && (
                                  <m.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-2">
                                    <m.a variants={staggerItem} href={`mailto:${msg.payload.email}`} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-md transition-all">
                                      <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Mail className="w-4 h-4" /></div>
                                      <div className="flex flex-col"><span className="text-[11px] text-slate-400 font-medium uppercase">Email</span><span className="text-sm text-slate-700 font-medium">{msg.payload.email}</span></div>
                                    </m.a>
                                    <m.a variants={staggerItem} href={`tel:${msg.payload.phone}`} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:border-green-200 hover:shadow-md transition-all">
                                      <div className="bg-green-50 p-2 rounded-lg text-green-600"><Phone className="w-4 h-4" /></div>
                                      <div className="flex flex-col"><span className="text-[11px] text-slate-400 font-medium uppercase">Phone</span><span className="text-sm text-slate-700 font-medium">{msg.payload.phone}</span></div>
                                    </m.a>
                                    <m.div variants={staggerItem} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all">
                                      <div className="bg-orange-50 p-2 rounded-lg text-orange-600"><MapPin className="w-4 h-4" /></div>
                                      <div className="flex flex-col"><span className="text-[11px] text-slate-400 font-medium uppercase">Office</span><span className="text-sm text-slate-700 font-medium">{msg.payload.address}</span></div>
                                    </m.div>
                                  </m.div>
                                )}

                                {msg.uiType === "faq-list" && msg.payload.map((item: any, i: number) => (
                                  <m.div variants={staggerItem} key={i} className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="font-medium text-slate-800 text-[14px]">Q: {item.question}</h4>
                                    <p className="text-sm text-slate-600 mt-2">A: {item.answer}</p>
                                  </m.div>
                                ))}

                                {msg.uiType === "resources-list" && msg.payload.map((item: any, i: number) => (
                                  <m.a variants={staggerItem} key={i} href={item.url} className="group flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-300">
                                    <div className="flex flex-col">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">{item.type}</span>
                                      <h4 className="font-medium text-slate-800 text-[14px] mt-0.5 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                    </div>
                                  </m.a>
                                ))}
                              </m.div>
                            )}
                          </div>
                          <span
                            className={cn(
                              "text-[10px] font-medium text-slate-400 px-1",
                              msg.role === "user" ? "text-right" : "text-left"
                            )}
                          >
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </m.div>
                  ))}

                  {/* Typing Indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <m.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        className="flex w-full justify-start"
                      >
                        <div className="flex max-w-[85%] sm:max-w-[75%] flex-row gap-3">
                          <m.div 
                            className="mt-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 border border-slate-200/60 shadow-sm"
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <Sparkles className="h-4 w-4 text-blue-600" />
                          </m.div>
                          <div className="flex flex-col gap-1">
                            <div className="rounded-2xl rounded-bl-sm bg-white border border-slate-100 px-5 py-4 shadow-sm flex items-center gap-3">
                              <span className="text-[13px] font-medium text-slate-500 tracking-wide">
                                IndiaWebProgrammers AI is typing
                              </span>
                              <div className="flex items-center gap-1">
                                <m.div
                                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                                  className="h-1.5 w-1.5 rounded-full bg-blue-500"
                                />
                                <m.div
                                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                                  className="h-1.5 w-1.5 rounded-full bg-blue-500"
                                />
                                <m.div
                                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                                  className="h-1.5 w-1.5 rounded-full bg-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                  
                  <div ref={messagesEndRef} className="h-4" />
                </div>
              )}
            </div>

            {/* CHAT INPUT */}
            <div className="relative p-4 sm:p-6 bg-white border-t border-slate-100 z-20">
              <div className="mx-auto max-w-3xl">
                <m.div
                  animate={inputValue.trim() ? { scale: 1.01 } : { scale: 1 }}
                  className={cn(
                    "relative flex items-end gap-2 rounded-2xl bg-white border p-2 transition-all duration-300",
                    inputValue.trim()
                      ? "border-slate-300 shadow-[0_0_15px_rgba(0,0,0,0.05)] ring-2 ring-slate-100/50"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-sm focus-within:border-slate-300 focus-within:shadow-[0_0_15px_rgba(0,0,0,0.05)] focus-within:ring-2 focus-within:ring-slate-100/50"
                  )}
                >
                  {/* Attachment Button */}
                  <button
                    disabled
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50 disabled:hover:bg-transparent mb-1"
                    aria-label="Attach file"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>

                  {/* Textarea */}
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="min-h-[44px] max-h-[200px] w-full resize-none bg-transparent py-3 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none custom-scrollbar leading-relaxed"
                    rows={1}
                    style={{ height: 'auto' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
                    }}
                  />

                  {/* Send Button */}
                  <m.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSend(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all mb-1 shadow-sm",
                      inputValue.trim() && !isTyping 
                        ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md" 
                        : "bg-slate-100 text-slate-400 opacity-70"
                    )}
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4 ml-0.5" />
                  </m.button>
                </m.div>
                <div className="mt-3 text-center">
                  <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                    Press <kbd className="font-sans font-semibold rounded bg-slate-50 px-1 border border-slate-200">Enter</kbd> to send, <kbd className="font-sans font-semibold rounded bg-slate-50 px-1 border border-slate-200">Shift + Enter</kbd> for new line
                  </span>
                </div>
              </div>
            </div>

          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
