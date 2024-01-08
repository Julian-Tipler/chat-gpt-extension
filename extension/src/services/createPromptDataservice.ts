import { PromptFormState } from "../views/prompts/PromptModal";
import { Prompt } from "../views/prompts/PromptsPage";

// If an id is passed, update existing prompt.
export const createOrUpdatePromptDataservice = async (
  form: PromptFormState,
  id?: string
) => {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.get({ prompts: [] }, function(result) {
      let prompts = result.prompts;
      if (id) {
        prompts = prompts.map((prompt: Prompt) => {
          if (prompt.id === id) {
            return { id, ...form };
          }
          return prompt;
        });
      } else {
        prompts.push({
          id: generateId(),
          name: form.name,
          text: form.text,
        });
      }

      chrome.storage.sync.set({ prompts }, function() {
        resolve();
      });
    });
  });
};

const generateId = () => {
  const randomNum = Math.random()
    .toString(36)
    .substr(2, 9);
  return randomNum;
};
