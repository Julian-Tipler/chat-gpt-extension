// Listens for changeText action and changes the text in the target website
chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === "changeText") {
    const searchBar = document.getElementById("prompt-textarea");
    console.log(searchBar);
    if (searchBar) {
      searchBar.value += request.popupText;
    }
  }
});
