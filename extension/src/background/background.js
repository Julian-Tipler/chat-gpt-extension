console.log("background.js 🚀🚀🚀");

// chrome.runtime.onInstalled.addListener(({ reason }) => {
//   console.log("reason", reason);
//   if (reason === "install") {
//     chrome.tabs.create({
//       url: "onboarding.html",
//     });
//   }
// });
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log("request", request);
    switch (request.action) {
      case "saveWiseSessionToken":
        saveWiseSessionToken(request.token);
        if (request.token) {
          sendResponse({ success: true, message: "Token has been received" });
        } else {
          sendResponse({ success: false, message: "Token is empty" });
        }
        break;
    }
    return true;
  }
);

function saveWiseSessionToken(token) {
  console.log("saveWiseSessionToken", token);
  chrome.storage.local.set({ wiseSessionToken: token }, function() {
    console.log("Wise session token saved");
  });
}
