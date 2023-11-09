import React, { createContext, useState, useContext, useEffect } from "react";
import { Prompt } from "../views/Main";
import { readPromptsDataservice } from "../services/readPromptsDataservice";
import { createPromptDataservice } from "../services/createPromptDataservice";
import { PromptFormState } from "../components/Form";
import { deletePromptDataservice } from "../services/deletePromptDataservice";

interface PromptsContextType {
  prompts: Prompt[];
  readPrompts: (prompt: Prompt[]) => void;
  createPrompt: (prompt: PromptFormState) => void;
  deletePrompt: (index: string) => void;
}

export const PromptsContext = createContext<PromptsContextType>({
  prompts: [],
  readPrompts: () => {},
  createPrompt: () => {},
  deletePrompt: () => {},
});

const PromptsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    readPrompts();
  }, []);

  const readPrompts = async () => {
    await readPromptsDataservice().then((prompts: Prompt[]) => {
      setPrompts(prompts);
    });
  };

  const createPrompt = async (form: PromptFormState) => {
    await createPromptDataservice(form);
    await readPrompts();
  };

  const deletePrompt = async (promptId: string) => {
    await deletePromptDataservice(promptId);
    await readPrompts();
  };

  return (
    <PromptsContext.Provider
      value={{ prompts, readPrompts, createPrompt, deletePrompt }}
    >
      {children}
    </PromptsContext.Provider>
  );
};

export default PromptsContextProvider;

export const usePrompts = () => useContext(PromptsContext);

