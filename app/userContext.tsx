import React, { createContext, useContext, useState, ReactNode } from "react";

type ProfessorContextType = {
  professorId: string | null;
  setProfessorId: (id: string) => void;
};

const ProfessorContext = createContext<ProfessorContextType | undefined>(
  undefined,
);

export const ProfessorProvider = ({ children }: { children: ReactNode }) => {
  const [professorId, setProfessorId] = useState<string | null>(null);

  return (
    <ProfessorContext.Provider value={{ professorId, setProfessorId }}>
      {children}
    </ProfessorContext.Provider>
  );
};

export const useProfessor = () => {
  const context = useContext(ProfessorContext);
  if (!context)
    throw new Error("useProfessor debe usarse dentro de ProfessorProvider");
  return context;
};
