console.log("content.js 🚀");

// AUTOCOMPLETE
// UI variables

document.addEventListener("DOMContentLoaded", function() {
  console.log("content.js DOM content loaded");
  // Your code to query the textarea element here
  let autocompleteText = "";
  const textArea =
    document.querySelector('input[type="text"]') ||
    document.querySelector("textarea");
  console.log(textArea);

  const textAreaContainer = textArea.parentNode;

  const ghostTextArea = document.createElement("div");
  ghostTextArea.classList.add("ghost-text-area");
  ghostTextArea.setAttribute("contenteditable", true);
  textAreaContainer.appendChild(ghostTextArea);

  const form = document.querySelector("form");
  form.addEventListener("submit", function() {
    syncGhostTextArea();
    resetAutocompleteText();
  });

  // Listeners
  textArea.addEventListener("input", () => {
    lastInputTime = Date.now();
    syncGhostTextArea();
  });
  let lastInputTime = Date.now();
  const DELAY_AFTER_TYPING = 500;
  setInterval(maybeAddAutocomplete, 200);

  document.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      textArea.value += autocompleteText;
      resetAutocompleteText();
      textArea.dispatchEvent(new Event("input", { bubbles: true }));
      textArea.focus();
    }
  });

  //Functions
  function syncGhostTextArea() {
    const newText = textArea.value.replace(/\n/g, "<br>");

    ghostTextArea.innerHTML = newText;
    const autocompleteTextContainer = document.createElement("span");
    autocompleteTextContainer.id = "autocomplete-text";
    autocompleteText = "";
    autocompleteTextContainer.textContent = autocompleteText;
    ghostTextArea.appendChild(autocompleteTextContainer);
  }

  function resetAutocompleteText() {
    const autocompleteTextContainer = document.getElementById(
      "autocomplete-text"
    );
    autocompleteText = "";
    autocompleteTextContainer.textContent = autocompleteText;
  }
  async function maybeAddAutocomplete() {
    // Has it been enough time since last user input and is the text itself long enough to warrant a fetch?
    if (
      Date.now() - lastInputTime >= DELAY_AFTER_TYPING &&
      textArea.value.length > 10 &&
      autocompleteText === ""
    ) {
      const autocomplete = await fetchAutocomplete();
      addautocompleteText(autocomplete);
    }
  }
  function addautocompleteText(autocomplete) {
    const existingautocompleteTextContainer = document.getElementById(
      "autocomplete-text"
    );
    autocompleteText = autocomplete;
    existingautocompleteTextContainer.textContent = autocompleteText;
  }

  function fetchAutocomplete() {
    // Fetch a recommendation from your ChatGPT API
    const content = textArea.textContent;
    const apiUrl =
      "http://localhost:54321/functions/v1/autocomplete?userId=80c39e74-7767-44a4-b6cf-2b2baa040a71";
    const accessToken = import.meta.env.VITE_WISE_API_TOKEN;
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
        return data.autocomplete;
      })
      .catch((error) => {
        console.error("error", error);
      });
  }
});

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
