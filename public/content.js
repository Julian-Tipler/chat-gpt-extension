console.log("content script running 👌 🤟");

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
const apiUrl = "mockApiUrl";
const accessToken = "MockAccessToken";

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
        const recommendation = data.recommendation; // Extract the recommendation from the API response
        if (recommendation) {
          // Insert the recommendation into the text input or textarea
          const inputField =
            document.querySelector('input[type="text"]') ||
            document.querySelector("textarea");
          if (inputField) {
            inputField.value += recommendation;
            lastInputTime = Date.now(); // Reset the timer
          }
        }
      });
  }
}, 500);

// mvp
// setTimeout for 5 seconds then fetch the autocomplete

// final
// Await typing finished
// then do fetch
