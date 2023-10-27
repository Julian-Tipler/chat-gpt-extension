export async function readAndDisplayPrompts() {
  chrome.storage.sync.get({ prompts: [] }, function (result) {
    const prompts = result.prompts;
    promptsList.innerHTML = ""; // Clear the list

    if (prompts.length > 0) {
      prompts.forEach(function (prompt, index) {
        // Create basic button
        const button = document.createElement("button");
        button.id = `prompt-${prompt.id}`;
        button.classList.add("insertTextButton");
        button.textContent = `${prompt.name}: ${prompt.text}`;

        // Attach click event listener to button
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
