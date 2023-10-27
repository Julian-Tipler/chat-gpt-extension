console.log("content.js")
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeText") {
    const searchBar = document.getElementById("prompt-textarea");
    if (searchBar) {
      searchBar.value = request.popupText
    }
  }
});
