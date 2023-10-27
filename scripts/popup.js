import { createPrompt } from "./prompts/createPrompt.js";

document.addEventListener("DOMContentLoaded", async function () {
  console.log("popup.js");
  fetchAndDisplayPrompts();

  // **CREATE**

  // Attach create function to form
  const promptForm = document.getElementById("promptForm");
  promptForm.addEventListener("submit", createPrompt);

  async function createPrompt(event) {
    event.preventDefault();

    const nameInput = document.getElementById("promptName");
    const textInput = document.getElementById("promptText");

    const name = nameInput.value;
    const text = textInput.value;

    // Retrieve existing prompts or initialize an empty array
    chrome.storage.sync.get({ prompts: [] }, function (result) {
      const prompts = result.prompts;

      // Add the new prompt to the array
      prompts.push({ name, text });

      // Save the updated prompts array to chrome.storage.sync
      chrome.storage.sync.set({ prompts }, function () {
        // Updates prompts
        fetchAndDisplayPrompts();
      });

      // Clear the form inputs
      nameInput.value = "";
      textInput.value = "";
    });
  }

  // **READ**

  // Function
  function fetchAndDisplayPrompts() {
    chrome.storage.sync.get({ prompts: [] }, function (result) {
      const prompts = result.prompts;
      promptsList.innerHTML = ""; // Clear the list

      if (prompts.length > 0) {
        prompts.forEach(function (prompt, index) {
          const button = document.createElement("button");
          button.classList.add("insertTextButton");
          button.textContent = `${prompt.name}: ${prompt.text}`;
          button.addEventListener("click", function () {
            chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                  action: "changeText",
                  popupText: button.textContent,
                });
              }
            );
          });
          promptsList.appendChild(button);
        });
      } else {
        promptsList.textContent = "No prompts saved yet.";
      }
    });
  }
});
