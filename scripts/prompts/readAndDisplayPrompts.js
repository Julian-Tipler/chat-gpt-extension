import { deletePrompt } from "./deletePrompt.js";

export async function readAndDisplayPrompts() {
  chrome.storage.sync.get({ prompts: [] }, function (result) {
    const prompts = result.prompts;
    const promptsList = document.getElementById("prompts-list");
    promptsList.innerHTML = ""; // Clear the list

    if (prompts.length > 0) {
      prompts.forEach(function (prompt, index) {
        // Create a div that contains the prompt name
        const promptName = document.createElement("div");
        promptName.classList.add("prompt-name");
        promptName.textContent = `${prompt.name}`;

        // Create basic copypaste button
        const copyButton = document.createElement("button");
        copyButton.id = `prompt-${prompt.id}`;
        copyButton.classList.add("clickable-button");
        copyButton.classList.add("copy-button");
        copyButton.addEventListener("click", function () {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: "changeText",
                popupText: prompt.text,
              });
            }
          );
        });
        var copyIcon = document.createElement("i");
        copyIcon.classList.add("fas", "fa-copy");
        copyButton.appendChild(copyIcon);

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("clickable-button");
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
          deletePrompt(prompt.id);
        });
        var deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas", "fa-trash");
        deleteButton.appendChild(deleteIcon);

        // Adds buttons to container and container to html
        const promptContainer = document.createElement("div");
        promptContainer.classList.add("prompt-container");
        promptContainer.appendChild(promptName);
        promptContainer.appendChild(copyButton);
        promptContainer.appendChild(deleteButton);
        promptsList.appendChild(promptContainer);
      });
    } else {
      promptsList.textContent = "No prompts saved yet.";
    }
  });
}
