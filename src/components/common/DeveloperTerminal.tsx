import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minus } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

type CommandOutput = {
  id: string;
  type: "command" | "output" | "error";
  text: React.ReactNode;
};

const HELP_TEXT = (
  <div className="space-y-1">
    <div>Available commands:</div>
    <div className="pl-4">
      <span className="text-accent font-semibold">help</span> - Show this message<br />
      <span className="text-accent font-semibold">about</span> - Display information about Karan<br />
      <span className="text-accent font-semibold">skills</span> - List technical skills<br />
      <span className="text-accent font-semibold">certifications</span> - List certifications<br />
      <span className="text-accent font-semibold">projects</span> - View featured projects<br />
      <span className="text-accent font-semibold">contact</span> - Show contact information<br />
      <span className="text-accent font-semibold">github</span> - Open GitHub profile<br />
      <span className="text-accent font-semibold">theme</span> - Toggle dark/light theme<br />
      <span className="text-accent font-semibold">clear</span> - Clear terminal output<br />
      <span className="text-accent font-semibold">whoami</span> - Display current user info<br />
    </div>
  </div>
);

export function DeveloperTerminal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [history, setHistory] = useState<CommandOutput[]>([
    { id: "init-1", type: "output", text: "Welcome to Karan Tiwari's Developer Terminal v1.0.0" },
    { id: "init-2", type: "output", text: 'Type "help" to get started.' },
  ]);
  const [input, setInput] = useState("");
  const { theme, setTheme } = useTheme();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, { id: Date.now().toString(), type: "command", text: `> ${cmd}` }]);
    
    let output: React.ReactNode = "";
    let isError = false;

    switch (trimmedCmd) {
      case "help":
        output = HELP_TEXT;
        break;
      case "about":
        output = "Karan Tiwari. BCA Student at JSS College (CGPA 9.23). Full Stack MERN Developer. Karate Black Belt. Seeking Internship from July 2026.";
        break;
      case "skills":
        output = "MERN Stack, Tailwind, AWS, n8n, OpenAI integrations, Java, C++, Python.";
        break;
      case "certifications":
        output = "1. Generative AI Foundations Certificate (upGrad & Microsoft)\n2. Solutions Architecture Job Simulation (AWS)\n3. Cyber Job Simulation (Deloitte)\n4. Generative AI Mastermind (Outskill)\n5. iCAT";
        break;
      case "projects":
        output = "1. RocketPro Tech Solutions\n2. WanderStay Booking\n3. Sparkal Dantalaya\n4. AI Automation Workflows\n5. Photography Showcase";
        break;
      case "contact":
        output = "Email: karantiwari35155@gmail.com | Phone: +91 7676137780";
        break;
      case "github":
        output = "Opening GitHub profile...";
        setTimeout(() => window.open("https://github.com/karantiwari35155-creator", "_blank"), 500);
        break;
      case "theme":
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        output = `Theme switched to ${newTheme} mode.`;
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "whoami":
        output = (
          <div>
            <div>Karan Tiwari</div>
            <div className="text-muted">Full Stack MERN Developer</div>
            <div className="text-muted">BCA Final Year</div>
            <div className="text-muted">Passionate about building modern web applications.</div>
          </div>
        );
        break;
      case "":
        setInput("");
        return;
      default:
        output = `Command not found: ${trimmedCmd}. Type "help" for a list of commands.`;
        isError = true;
    }

    setTimeout(() => {
      setHistory(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        type: isError ? "error" : "output", 
        text: output 
      }]);
    }, 100);
    
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-4 md:inset-x-auto md:right-24 bottom-24 z-50 md:w-[600px] h-[400px] bg-[#1c1c1e] rounded-xl shadow-2xl border border-white/20 overflow-hidden flex flex-col font-mono text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {/* MacOS Terminal Header */}
          <div className="h-10 bg-[#2d2d2f] border-b border-black/50 flex items-center px-4 justify-between select-none">
            <div className="flex gap-2">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group">
                <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
              </button>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group">
                <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black" />
              </div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center group">
                <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-sans font-medium">
              <TerminalIcon size={14} />
              karan@portfolio ~ zsh
            </div>
            <div className="w-16" /> {/* Spacer for centering */}
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 overflow-y-auto text-[#f1f1f1] scrollbar-hide">
            {history.map((item) => (
              <div key={item.id} className="mb-2 whitespace-pre-wrap">
                {item.type === "command" && (
                  <span className="text-gray-400">{item.text}</span>
                )}
                {item.type === "output" && (
                  <div className="text-[#f1f1f1]">{item.text}</div>
                )}
                {item.type === "error" && (
                  <div className="text-[#ff5f56]">{item.text}</div>
                )}
              </div>
            ))}
            
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="text-[#27c93f] mr-2">➜</span>
              <span className="text-[#58a6ff] mr-2">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[#f1f1f1] font-mono caret-white"
                spellCheck={false}
                autoComplete="off"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
