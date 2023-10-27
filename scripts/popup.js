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
    if (
      promptForm.style.display === "none" ||
      promptForm.style.display === ""
    ) {
      // Show the form
      promptForm.style.display = "block";
      showFormButton.textContent = "-";
    } else {
      // Hide the form
      promptForm.style.display = "none";
      showFormButton.textContent = "+";
    }
  });

  // **READ**

  // Function
});
