import React, { createContext, useState, useContext, useEffect } from "react";
import { Prompt } from "../views/prompts/PromptsPage";
import { readPromptsDataservice } from "../services/readPromptsDataservice";
import { createOrUpdatePromptDataservice } from "../services/createPromptDataservice";
import { PromptFormState } from "../views/prompts/PromptModal";
import { deletePromptDataservice } from "../services/deletePromptDataservice";

interface PromptsContextType {
  prompts: Prompt[];
  createPrompt: (prompt: PromptFormState) => void;
  updatePrompt: (prompt: PromptFormState, id: string) => void;
  readPrompts: (prompt: Prompt[]) => void;
  deletePrompt: (index: string) => void;
}

export const PromptsContext = createContext<PromptsContextType>({
  prompts: [],
  createPrompt: () => {},
  readPrompts: () => {},
  updatePrompt: () => {},
  deletePrompt: () => {},
});

const PromptsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    readPrompts();
  }, []);

  const createPrompt = async (form: PromptFormState) => {
    await createOrUpdatePromptDataservice(form);
    await readPrompts();
  };

  const readPrompts = async () => {
    await readPromptsDataservice().then((prompts: Prompt[]) => {
      setPrompts(prompts);
    });
  };

  const updatePrompt = async (form: PromptFormState, id: string) => {
    await createOrUpdatePromptDataservice(form, id);
    await readPrompts();
  };

  const deletePrompt = async (promptId: string) => {
    await deletePromptDataservice(promptId);
    await readPrompts();
  };

  return (
    <PromptsContext.Provider
      value={{ prompts, createPrompt, readPrompts, updatePrompt, deletePrompt }}
    >
      {children}
    </PromptsContext.Provider>
  );
};

export default PromptsContextProvider;

export const usePrompts = () => useContext(PromptsContext);
