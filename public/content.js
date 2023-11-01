console.log("content script running !!!");

// Prompts
chrome.runtime.onMessage.addListener(function(request) {
  switch (request.action) {
    case "changeText":
      changeText(request.text);
      break;
  }
});

function changeText(text) {
  const searchBar = document.getElementById("prompt-textarea");
  if (searchBar) {
    searchBar.value += text;
  }
}

// Autocomplete
// Global variables
const textArea =
  document.querySelector('input[type="text"]') ||
  document.querySelector("textarea");
const textAreaContainer = textArea.parentNode;
let superTextInput;
let lastInputTime = Date.now();
const recommendationDelay = 1500;

//Listeners
document.addEventListener("input", () => {
  lastInputTime = Date.now();
});

document.addEventListener("keydown", function(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    insertAutocompleteText("hello text");
  }
});
//Functions
function fetchAutocomplete() {
  if (Date.now() - lastInputTime >= recommendationDelay) {
    // Fetch a recommendation from your ChatGPT API
    const content =
      "There once was a rubber duck named 'Quack'. He lived in a very nice";
    const apiUrl =
      "http://localhost:54321/functions/v1/autocomplete?userId=<redacted>";
    const accessToken = "<redacted>";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        const autocomplete = data.autocomplete; // Extract the recommendation from the API response
        if (autocomplete) {
          // Insert the recommendation into the text input or textarea
          addAutocompleteText(autocomplete);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  }
}

setInterval(() => {}, 1000000);

// Already present components

function modifySuperTextInput() {
  // Create super text input
  textAreaContainer.classList.add("text-area-container");
  superTextInput = document.createElement("div");
  superTextInput.classList.add("super-text-input");
  superTextInput.setAttribute("contenteditable", true);
  superTextInput.addEventListener("input", () => {});
  textAreaContainer.appendChild(superTextInput);

  // Makes the value of textArea equal to superTextInput (underneath) when typing
  superTextInput.addEventListener("input", () => {
    textArea.value = superTextInput.value;
    textArea.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
modifySuperTextInput();

function addAutocompleteText(autocomplete) {
  if (textArea) {
    textArea.focus();

    const ghostText = document.createElement("span");
    ghostText.classList.add("ghost-text");
    ghostText.textContent += autocomplete;
    superTextInput.appendChild(ghostText);

    console.log(superTextInput);
    textArea.dispatchEvent(new Event("input", { bubbles: true }));
    lastInputTime = Date.now();
  }
}
// setInterval(() => {
//   addAutocompleteText("hello");
// }, 5000);

function insertAutocompleteText(autocomplete) {
  const textArea =
    document.querySelector('input[type="text"]') ||
    document.querySelector("textarea");
  textArea.textContent += autocomplete;
  textArea.dispatchEvent(new Event("input", { bubbles: true }));
}
