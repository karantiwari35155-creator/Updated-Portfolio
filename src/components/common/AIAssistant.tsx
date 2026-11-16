import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { cn } from "../../utils/cn";

type Message = {
  id: string;
  type: "user" | "bot";
  text: string;
};

const INITIAL_MESSAGE: Message = {
  id: "init",
  type: "bot",
  text: "Hi! I'm Karan's Portfolio Assistant. I can help you learn about his projects, skills, education, and contact information. How can I help you today?"
};

const SUGGESTIONS = [
  "Tell me about Karan",
  "Show projects",
  "Show skills",
  "Download resume"
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), type: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(text.toLowerCase());
      setMessages((prev) => [...prev, { id: Date.now().toString(), type: "bot", text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    if (query.includes("about") || query.includes("who is karan")) {
      return "Karan Tiwari is a Full Stack MERN Developer and BCA Final Year student based in Mysore, Karnataka. He specializes in React, Node.js, Express, and MongoDB.";
    }
    if (query.includes("project")) {
      setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), 1500);
      return "I'll take you to the projects section! Karan has built several full-stack applications, including Vaikuntha Silver (an e-commerce platform) and a Dental Clinic website.";
    }
    if (query.includes("skill") || query.includes("tech")) {
      setTimeout(() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }), 1500);
      return "Karan is skilled in Frontend (React, Tailwind), Backend (Node.js, Express), Databases (MongoDB, SQL), and Tools (Git, VS Code). I'll scroll to the skills section for you.";
    }
    if (query.includes("resume") || query.includes("cv")) {
      return "You can download Karan's resume by clicking the 'Download Resume' button in the Hero section or the Resume section.";
    }
    if (query.includes("contact") || query.includes("email") || query.includes("hire")) {
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 1500);
      return "You can reach Karan via email at karantiwari@example.com, or use the contact form below. I'm taking you there now!";
    }
    if (query.includes("education") || query.includes("study") || query.includes("college")) {
      return "Karan is currently in his Final Year of Bachelor of Computer Applications (BCA).";
    }
    return "I'm a simple assistant. I can tell you about Karan's projects, skills, education, or how to contact him. Try asking 'Tell me about Karan'!";
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-accent to-highlight flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        style={{ display: isOpen ? "none" : "flex" }}
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] glass-card border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-surface flex justify-between items-center">
              <div className="flex items-center gap-2 text-text">
                <Bot size={20} className="text-accent" />
                <span className="font-semibold">Portfolio Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/10 text-muted transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-surface/30">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex gap-3",
                    msg.type === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.type === "user" ? "bg-accent text-white" : "bg-surface-dark border border-white/10 text-accent"
                  )}>
                    {msg.type === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "px-4 py-2 rounded-2xl max-w-[80%] text-sm leading-relaxed",
                    msg.type === "user" 
                      ? "bg-accent text-white rounded-tr-none" 
                      : "bg-surface-dark border border-white/10 text-text rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-dark border border-white/10 text-accent flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-surface-dark border border-white/10 rounded-tl-none flex gap-1 items-center">
                    <motion.div className="w-1.5 h-1.5 bg-muted rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-1.5 h-1.5 bg-muted rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-1.5 h-1.5 bg-muted rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-white/5 bg-surface/30">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-surface text-muted hover:text-accent hover:border-accent/50 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="p-3 border-t border-white/10 bg-surface flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-surface-dark border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-opacity"
              >
                <Send size={16} className="-ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
