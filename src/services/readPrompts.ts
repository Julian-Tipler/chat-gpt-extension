import { Prompt } from "../App";

export const readPrompts = async (): Promise<Prompt[]> => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chrome.storage.sync.get({ prompts: [] }, function(payload: any) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        const prompts = payload.prompts || [];
        resolve(prompts as Prompt[]);
      }
    });
  });
};
