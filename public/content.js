console.log("content script running 🚀");

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

//Autocomplete
let lastInputTime = Date.now();
const recommendationDelay = 2000;
document.addEventListener("input", () => {
  lastInputTime = Date.now();
});

const content =
  "There once was a rubber duck named 'Quack'. He lived in a very nice";
const apiUrl =
  "http://localhost:54321/functions/v1/autocomplete?userId=<redacted>";
const accessToken = "<redacted>";

setInterval(() => {
  if (Date.now() - lastInputTime >= recommendationDelay) {
    // Fetch a recommendation from your ChatGPT API
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
          createAutocompleteText(autocomplete);
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  }
}, 1000000);

function createAutocompleteText(autocomplete) {
  const textArea =
    document.querySelector('input[type="text"]') ||
    document.querySelector("textarea");
  if (textArea) {
    textArea.focus();
    const ghostText = document.createElement("span");
    ghostText.style.opacity = 0.5;
    ghostText.textContent += autocomplete;
    console.log("ghostText", ghostText);
    textArea.parentNode.appendChild(ghostText);
    console.log("textArea", textArea);
    textArea.dispatchEvent(new Event("input", { bubbles: true }));
    lastInputTime = Date.now();
  }
}
setTimeout(() => {
  createAutocompleteText("hello");
}, 1000);

function insertAutocompleteText(autocomplete) {
  const textArea =
    document.querySelector('input[type="text"]') ||
    document.querySelector("textarea");
  textArea.textContent += autocomplete;
  textArea.dispatchEvent(new Event("input", { bubbles: true }));
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    insertAutocompleteText("hello text");
  }
});
