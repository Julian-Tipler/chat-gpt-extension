import { readAndDisplayPrompts } from "./readAndDisplayPrompts.js";

export async function createPrompt(event) {
  event.preventDefault();

  const nameInput = document.getElementById("prompt-form-name");
  const textInput = document.getElementById("prompt-form-text");

  const name = nameInput.value;
  const text = textInput.value;

  // Retrieve existing prompts or initialize an empty array
  chrome.storage.sync.get({ prompts: [] }, function (result) {
    const prompts = result.prompts;

    // Add the new prompt to the array
    prompts.push({ id: generateId(), name, text });

    // Save the updated prompts array to chrome.storage.sync
    chrome.storage.sync.set({ prompts }, function () {
      // Updates prompts
      readAndDisplayPrompts();
    });

    // Clear the form inputs
    nameInput.value = "";
    textInput.value = "";
  });
}

const generateId = () => {
  const randomNum = Math.random().toString(36).substr(2, 9);
  return randomNum;
};
