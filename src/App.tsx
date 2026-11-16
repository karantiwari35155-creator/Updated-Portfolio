import { useEffect, useState } from "react";
import Lenis from "lenis";
import { LoadingScreen } from "./components/common/LoadingScreen";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { Projects } from "./sections/Projects";
import { Certifications } from "./sections/Certifications";
import { Skills } from "./sections/Skills";
import { Resume } from "./sections/Resume";
import { Contact } from "./sections/Contact";
import { Footer } from "./components/layout/Footer";
import { CustomCursor } from "./components/common/CustomCursor";
import { CommandPalette } from "./components/common/CommandPalette";
import { AIAssistant } from "./components/common/AIAssistant";
import { DeveloperTerminal } from "./components/common/DeveloperTerminal";
import { AnimatePresence } from "framer-motion";
import { useRecruiterMode } from "./context/RecruiterContext";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { isRecruiterMode } = useRecruiterMode();

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-background text-text transition-colors duration-300">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            key="loading"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CustomCursor />
          <CommandPalette onOpenTerminal={() => setIsTerminalOpen(true)} />
          <AIAssistant />
          <DeveloperTerminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
          
          <Navbar />
          
          <main className={`w-full ${isRecruiterMode ? 'max-w-4xl mx-auto' : ''}`}>
            <Hero />
            
            <About />
            
            <Services />

            <Skills />

            <Projects />

            <Certifications />

            <Resume />

            <Contact />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
