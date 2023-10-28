import { readAndDisplayPrompts } from "./readAndDisplayPrompts.js";
export function deletePrompt(id) {
  chrome.storage.sync.get({ prompts: [] }, function (result) {
    const prompts = result.prompts;

    // Find the index of the prompt with the given id
    const index = prompts.findIndex(function (prompt) {
      return prompt.id === id;
    });

    // Remove the prompt from the array
    prompts.splice(index, 1);

    // Save the updated prompts array to chrome.storage.sync
    chrome.storage.sync.set({ prompts }, function () {
      // Updates prompts
      readAndDisplayPrompts();
    });
  });
}
