console.log("popup.js")
const buttons = document.getElementsByClassName("changeTextButton");
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeText",
        popupText: button.textContent,
      });
    });
  });
});
