import { addPrompt } from "./addPrompt";

export const setupPromptListener = () => {
  chrome.runtime.onMessage.addListener(function(request) {
    switch (request.action) {
      case "addPrompt":
        addPrompt(request.text);
        break;
    }
  });
};
