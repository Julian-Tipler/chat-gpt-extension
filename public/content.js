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
const accessToken =
  "<redacted>";

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
          const inputField =
            document.querySelector('input[type="text"]') ||
            document.querySelector("textarea");
          console.log(inputField);
          if (inputField) {
            inputField.focus();
            inputField.value += `<span class="ghost-text" styles={{color:white}}>${autocomplete}</span>`;
            inputField.dispatchEvent(new Event("input", { bubbles: true }));
            // add scrolling behavior
            lastInputTime = Date.now(); // Reset the timer
          }
        }
      })
      .catch((error) => {
        console.error("error", error);
      });
  }
}, 10000);

// mvp
// setTimeout for 5 seconds then fetch the autocomplete

// final
// Await typing finished
// then do fetch
