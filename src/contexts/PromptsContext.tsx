import React, { createContext, useState, useContext } from "react";
import { Prompt } from "../App";

interface PromptsContextType {
  prompts: Prompt[];
  addPrompt: (prompt: Prompt) => void;
  addPrompts: (prompt: Prompt[]) => void;
  removePrompt: (index: number) => void;
}

export const PromptsContext = createContext<PromptsContextType>({
  prompts: [],
  addPrompt: () => {},
  addPrompts: () => {},
  removePrompt: () => {},
});

const PromptsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const addPrompts = (prompts: Prompt[]) => {
    console.log("in context", prompts);
    setPrompts([...prompts]);
  };
  const addPrompt = (prompt: Prompt) => {
    setPrompts([...prompts, prompt]);
  };

  const removePrompt = (index: number) => {
    const newPrompts = [...prompts];
    newPrompts.splice(index, 1);
    setPrompts(newPrompts);
  };

  return (
    <PromptsContext.Provider
      value={{ prompts, addPrompt, addPrompts, removePrompt }}
    >
      {children}
    </PromptsContext.Provider>
  );
};

export default PromptsContextProvider;

export const usePrompts = () => useContext(PromptsContext);
