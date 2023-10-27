import { createPrompt } from "./prompts/createPrompt.js";
import { readAndDisplayPrompts } from "./prompts/readAndDisplayPrompts.js";

document.addEventListener("DOMContentLoaded", async function () {
  readAndDisplayPrompts();

  // **CREATE**

  // Attach create function to form
  const promptForm = document.getElementById("promptForm");
  promptForm.addEventListener("submit", createPrompt);

  // **READ**

  // Function
});
