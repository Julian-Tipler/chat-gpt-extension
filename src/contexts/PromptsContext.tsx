import React, { createContext, useState, useContext, useEffect } from "react";
import { Prompt } from "../App";
import { readPromptsDataservice } from "../services/readPromptsDataservice";
import { createPromptDataservice } from "../services/createPromptDataservice";
import { PromptFormState } from "../components/Form";

interface PromptsContextType {
  prompts: Prompt[];
  addPrompts: (prompt: Prompt[]) => void;
  createPrompt: (prompt: PromptFormState) => void;
  removePrompt: (index: number) => void;
}

export const PromptsContext = createContext<PromptsContextType>({
  prompts: [],
  addPrompts: () => {},
  createPrompt: () => {},
  removePrompt: () => {},
});

const PromptsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    addPrompts();
  }, []);

  const addPrompts = async () => {
    await readPromptsDataservice().then((prompts: Prompt[]) => {
      setPrompts(prompts);
    });
  };

  const createPrompt = async (form: PromptFormState) => {
    await createPromptDataservice(form);
    await addPrompts();
  };

  const removePrompt = (index: number) => {
    const newPrompts = [...prompts];
    newPrompts.splice(index, 1);
    setPrompts(newPrompts);
  };

  return (
    <PromptsContext.Provider
      value={{ prompts, addPrompts, createPrompt, removePrompt }}
    >
      {children}
    </PromptsContext.Provider>
  );
};

export default PromptsContextProvider;

export const usePrompts = () => useContext(PromptsContext);
