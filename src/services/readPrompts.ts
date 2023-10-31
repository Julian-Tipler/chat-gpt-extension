import { Prompt } from "../App";

export const readPrompts = async () => {
  const prompts: Prompt[] = [];
  chrome.storage.sync.get(null, function(payload: any) {
    if (payload.prompts) prompts.push(...payload.prompts);
  });
  return prompts as Prompt[];
};
