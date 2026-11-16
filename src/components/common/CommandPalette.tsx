import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal as TerminalIcon, Home, User, Briefcase, Code, FolderGit2, FileText, Mail, Moon, Sun, Target } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useRecruiterMode } from "../../context/RecruiterContext";

export function CommandPalette({ onOpenTerminal }: { onOpenTerminal: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const ACTIONS = [
    { id: "home", title: "Go to Home", icon: Home, onSelect: () => scrollTo("#home") },
    { id: "about", title: "Go to About", icon: User, onSelect: () => scrollTo("#about") },
    { id: "services", title: "Go to Services", icon: Briefcase, onSelect: () => scrollTo("#services") },
    { id: "skills", title: "Go to Skills", icon: Code, onSelect: () => scrollTo("#skills") },
    { id: "projects", title: "Go to Projects", icon: FolderGit2, onSelect: () => scrollTo("#projects") },
    { id: "certifications", title: "Go to Certifications", icon: FileText, onSelect: () => scrollTo("#certifications") },
    { id: "resume", title: "Go to Resume", icon: FileText, onSelect: () => scrollTo("#resume") },
    { id: "contact", title: "Go to Contact", icon: Mail, onSelect: () => scrollTo("#contact") },
    { id: "theme", title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Theme`, icon: theme === "dark" ? Sun : Moon, onSelect: () => { setTheme(theme === "dark" ? "light" : "dark"); setIsOpen(false); } },
    { id: "recruiter", title: `${isRecruiterMode ? "Exit" : "Enter"} Recruiter Mode`, icon: Target, onSelect: () => { toggleRecruiterMode(); setIsOpen(false); } },
    { id: "terminal", title: "Open Developer Terminal", icon: TerminalIcon, onSelect: () => { onOpenTerminal(); setIsOpen(false); } },
  ];

  const filteredActions = ACTIONS.filter((action) =>
    action.title.toLowerCase().includes(query.toLowerCase())
  );

  const scrollTo = (hash: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-card"
            >
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search size={20} className="text-muted" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none text-text text-lg placeholder:text-muted/50"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <div className="text-xs text-muted border border-white/10 rounded px-2 py-1 font-mono">ESC</div>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
                {filteredActions.length === 0 ? (
                  <div className="p-8 text-center text-muted">
                    No results found for "{query}"
                  </div>
                ) : (
                  filteredActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={action.onSelect}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                    >
                      <action.icon size={18} className="text-muted group-hover:text-accent transition-colors" />
                      <span className="flex-1 text-text group-hover:text-white transition-colors">{action.title}</span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
