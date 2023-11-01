console.log("content script running !!!");

// AUTOCOMPLETE
// UI variables
const textArea =
  document.querySelector('input[type="text"]') ||
  document.querySelector("textarea");

const textAreaContainer = textArea.parentNode;
textAreaContainer.classList.add("text-area-container");

const superTextArea = document.createElement("div");
superTextArea.classList.add("super-text-area");
superTextArea.setAttribute("contenteditable", true);
textAreaContainer.appendChild(superTextArea);

let ghostText = "";

// Listeners
textArea.addEventListener("input", () => {
  lastInputTime = Date.now();
  superTextArea.textContent = textArea.value;
  const ghostTextContainer = document.createElement("span");
  ghostTextContainer.id = "ghost-text";
  ghostText = "";
  ghostTextContainer.textContent = ghostText;
  superTextArea.appendChild(ghostTextContainer);
  console.log(superTextArea);
});
let lastInputTime = Date.now();
const DELAY_AFTER_TYPING = 2000;
setInterval(maybeAddAutocomplete, 1000);

document.addEventListener("keydown", function(event) {
  if (event.key === "Tab") {
    console.log("tab pressed");
    event.preventDefault();
    textArea.value += ghostText;
    textArea.dispatchEvent(new Event("input", { bubbles: true }));
    textArea.focus();
  }
});

//Functions
async function maybeAddAutocomplete() {
  // Has it been enough time since last user input and is the text itself long enough to warrant a fetch?
  if (
    Date.now() - lastInputTime >= DELAY_AFTER_TYPING &&
    textArea.value.length > 10
  ) {
    const autocomplete = await fetchAutocomplete();
    addGhostText(autocomplete);
  }
}
function addGhostText(autocomplete) {
  const existingGhostTextContainer = document.getElementById("ghost-text");
  ghostText = autocomplete;
  existingGhostTextContainer.textContent = ghostText;
}

function fetchAutocomplete() {
  console.log("fetching autocomplete");
  // Fetch a recommendation from your ChatGPT API
  const content = textArea.textContent;
  const apiUrl =
    "http://localhost:54321/functions/v1/autocomplete?userId=80c39e74-7767-44a4-b6cf-2b2baa040a71";
  const accessToken =
    ***REMOVED***;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data.autocomplete", data.autocomplete);
      return data.autocomplete;
    })
    .catch((error) => {
      console.error("error", error);
    });
}

// PROMPTS
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
