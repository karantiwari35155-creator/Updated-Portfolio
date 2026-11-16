import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Target, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useRecruiterMode } from "../../context/RecruiterContext";
import { useScroll } from "../../hooks/useScroll";
import { cn } from "../../utils/cn";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();
  const { isScrolled, isScrollingUp } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navVariants = {
    visible: { y: 0, opacity: 1, scale: 1 },
    hidden: { y: -100, opacity: 0, scale: 0.95 },
    scrolled: { 
      y: 10, 
      scale: 0.95,
      padding: "0.5rem 1rem",
      backgroundColor: "var(--surface)",
      opacity: 0.95,
      backdropFilter: "blur(12px)",
      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)"
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4 pointer-events-none"
        initial="visible"
        animate={isScrolled && !isScrollingUp ? "hidden" : "visible"}
        variants={navVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.nav
          className={cn(
            "pointer-events-auto flex items-center justify-between rounded-full border border-text/10 px-6 py-3 transition-all duration-300 w-full max-w-5xl",
            isScrolled ? "bg-surface/70 backdrop-blur-md shadow-lg" : "bg-surface/30 backdrop-blur-sm"
          )}
          layout
        >
          {/* Logo */}
          <a href="#home" className="text-xl font-bold font-heading tracking-tighter mr-8">
            KT
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setActiveSection(link.name)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    activeSection === link.name ? "text-text" : "text-muted hover:text-text"
                  )}
                >
                  {activeSection === link.name && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-text/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 ml-auto md:ml-8">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-text/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={toggleRecruiterMode}
              className={cn(
                "p-2 rounded-full hover:bg-text/10 transition-colors group relative flex items-center gap-2",
                isRecruiterMode && "text-yellow-400"
              )}
              aria-label="Toggle Recruiter Mode"
            >
              <Target size={18} className={cn(isRecruiterMode && "animate-pulse")} />
              <span className="hidden lg:inline text-sm font-medium pr-2">Recruiter Mode</span>
              {/* Tooltip */}
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-surface border border-text/10 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {isRecruiterMode ? "Exit Recruiter Mode" : "Enter Recruiter Mode"}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 ml-2 hover:bg-text/10 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-30 md:hidden bg-surface/95 backdrop-blur-xl border border-text/10 rounded-2xl p-4 shadow-2xl"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "block px-4 py-3 text-lg font-medium rounded-xl transition-colors",
                      activeSection === link.name ? "bg-text/10 text-text" : "text-muted hover:text-text hover:bg-text/5"
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
