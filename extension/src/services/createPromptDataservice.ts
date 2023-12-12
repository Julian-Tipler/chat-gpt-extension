import { PromptFormState } from "../views/prompts/NewPromptModal";

export const createPromptDataservice = async (form: PromptFormState) => {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.get({ prompts: [] }, function(result) {
      const prompts = result.prompts;

      prompts.push({
        id: generateId(),
        name: form.name,
        text: form.text,
      });

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
