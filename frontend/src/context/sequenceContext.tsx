import { createContext, ReactNode, useContext, useState } from "react";
import { NodeTypes } from "../lib/types";

interface SequenceContextType {
  steps?: SequenceStep[];
  handleSteps: (newStep: SequenceStep) => void;
  handleLeads: (newLeads: string) => void;
  leads?: string[];
}

// interface Steps{
//   type:
// }
interface SequenceStep {
  type: NodeTypes;
  emailBody?: string;
  waitFor: {
    days?: number;
    hours?: number;
    minutes?: number;
  };
}
export const SequenceContext = createContext<SequenceContextType | undefined>(
  undefined
);

export const SequenceProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<SequenceStep[]>([]);
  const [leads, setLeads] = useState<string[]>([]);

  function handleSteps(newStep: SequenceStep) {
    setSteps((values: SequenceStep[]) => {
      return [...values, newStep];
    });
  }

  function handleLeads(newLeads: string) {
    setLeads((val: string[]) => [...val, newLeads]);
  }
  return (
    <SequenceContext.Provider value={{ handleSteps, handleLeads }}>
      {children}
    </SequenceContext.Provider>
  );
};

export const useSequence = () => {
  const context = useContext(SequenceContext);
  if (context === undefined) {
    throw new Error("useSequence must be used within an Sequence Provider");
  }
  return context;
};