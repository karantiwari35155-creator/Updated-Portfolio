import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");
  const fullText = "Full Stack MERN Developer";

  useEffect(() => {
    // Progress bar animation
    const duration = 1800; // 1.8 seconds total
    const interval = 20; // update every 20ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400); // Wait a bit before completing
      }
    }, interval);

    // Typing animation
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, (duration - 400) / fullText.length); // Finish typing before progress hits 100%

    return () => {
      clearInterval(timer);
      clearInterval(typeInterval);
    };
  }, [onComplete, fullText]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="flex flex-col items-center max-w-md w-full px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-6xl font-bold font-heading mb-4 tracking-tighter"
        >
          KT
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl font-medium mb-2 font-heading"
        >
          Karan Tiwari
        </motion.div>
        
        <div className="h-6 text-muted-dark font-mono text-sm md:text-base mb-8">
          {text}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-white ml-1 align-middle"
          />
        </div>

        <div className="w-full relative">
          <div className="flex justify-between text-xs font-mono text-muted-dark mb-2">
            <span>Loading experience</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 w-full bg-surface-dark overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-white"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </div>
      </div>
      
      {/* Subtle particles effect using framer motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
