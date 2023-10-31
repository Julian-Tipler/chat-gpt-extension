import { createPrompt } from "./prompts/createPrompt.js";
import { readAndDisplayPrompts } from "./prompts/readAndDisplayPrompts.js";

document.addEventListener("DOMContentLoaded", async function () {
  await readAndDisplayPrompts();

  // **CREATE**

  // Attach create function to form
  const promptForm = document.getElementById("prompt-form");
  promptForm.addEventListener("submit", createPrompt);

  const showFormButton = document.getElementById("show-form-button");
  showFormButton.addEventListener("click", function () {
    if (!promptForm.classList.contains("prompt-form-displayed")) {
      // Show the form
      promptForm.classList.add("prompt-form-displayed");
      showFormButton.textContent = "-";
    } else {
      // Hide the form
      promptForm.classList.remove("prompt-form-displayed");
      showFormButton.textContent = "+";
    }
  });

  // **READ**

  // Function
});
