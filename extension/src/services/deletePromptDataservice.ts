import { Prompt } from "../views/prompts/PromptsPage";

export const deletePromptDataservice = async (promptId: string) => {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.get({ prompts: [] }, function(result) {
      const prompts = result.prompts.filter((p: Prompt) => p.id !== promptId);
      chrome.storage.sync.set({ prompts }, function() {
        resolve();
      });
    });
  });
};
