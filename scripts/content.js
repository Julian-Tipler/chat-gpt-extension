console.log("content.js");

// Listens for changeText action and changes the text in the target website
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeText") {
    const searchBar = document.getElementById("prompt-textarea");
    if (searchBar) {
      searchBar.value = request.popupText;
    }
  }
});

