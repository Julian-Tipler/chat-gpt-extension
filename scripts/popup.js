document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("changeTextButton")
    .addEventListener("click", function () {
      console.log("Click received");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "changeText" });
      });
    });
});
