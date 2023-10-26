chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeH1Text") {
    const h1Elements = document.querySelectorAll("h1");
    h1Elements.forEach((element) => {
      element.textContent = "itsa me";
    });
  }

  // const searchBar = document.getElementById("prompt-textarea");
  // if (searchBar) {
  //   searchBar.value = "hello world";
  // } else {
  // }
});
