import { createPrompt } from "../prompts/createPrompt.js";

export const openFormButton = () => {
  // Selectors
  const promptForm = document.getElementById("prompt-form");
  const showFormButton = document.getElementById("show-form-button");

  // Event listeners
  promptForm.addEventListener("submit", createPrompt);
  showFormButton.addEventListener("click", toggleForm);

  // Functions
  function toggleForm(e) {
    console.log("toggleForm");
    e.preventDefault();
    if (!promptForm.classList.contains("prompt-form-displayed")) {
      // Show the form
      promptForm.classList.add("prompt-form-displayed");
      showFormButton.textContent = "-";
    } else {
      // Hide the form
      promptForm.classList.remove("prompt-form-displayed");
      showFormButton.textContent = "+";
    }
  }
};
