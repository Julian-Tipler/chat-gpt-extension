import { deletePrompt } from "./deletePrompt.js";

export async function readAndDisplayPrompts() {
  chrome.storage.sync.get({ prompts: [] }, function (result) {
    const prompts = result.prompts;
    const promptsList = document.getElementById("prompts-list");
    promptsList.innerHTML = ""; // Clear the list

    if (prompts.length > 0) {
      prompts.forEach(function (prompt, index) {
        // Create basic button
        const button = document.createElement("button");
        button.id = `prompt-${prompt.id}`;
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

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
          deletePrompt(prompt.id);
        });

        // Adds buttons to container and container to html
        const promptContainer = document.createElement("div");
        promptContainer.appendChild(button);
        promptContainer.appendChild(deleteButton);
        promptsList.appendChild(promptContainer);
      });
    } else {
      promptsList.textContent = "No prompts saved yet.";
    }
  });
}
