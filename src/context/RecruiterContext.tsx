import React, { createContext, useContext, useState } from "react";

type RecruiterContextType = {
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
};

const RecruiterContext = createContext<RecruiterContextType | undefined>(undefined);

export function RecruiterProvider({ children }: { children: React.ReactNode }) {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  const toggleRecruiterMode = () => setIsRecruiterMode((prev) => !prev);

  return (
    <RecruiterContext.Provider value={{ isRecruiterMode, toggleRecruiterMode }}>
      {children}
    </RecruiterContext.Provider>
  );
}

export function useRecruiterMode() {
  const context = useContext(RecruiterContext);
  if (context === undefined) {
    throw new Error("useRecruiterMode must be used within a RecruiterProvider");
  }
  return context;
}
