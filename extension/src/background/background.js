console.log("background.js 🚀");

// chrome.runtime.onInstalled.addListener(({ reason }) => {
//   console.log("reason", reason);
//   if (reason === "install") {
//     chrome.tabs.create({
//       url: "onboarding.html",
//     });
//   }
// });
chrome.runtime.onMessageExternal.addListener((message) => {
  console.log("message", message);
  switch (message.action) {
    case "saveWiseSessionToken":
      saveWiseSessionToken(message.token);
      break;
  }
  return true;
});

function saveWiseSessionToken(token) {
  console.log("saveWiseSessionToken", token);
  chrome.storage.local.set({ wiseSessionToken: token }, function() {
    console.log("Wise session token saved");
  });
}
