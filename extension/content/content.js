import "./index.css";
import { setupResponseHelper } from "./responseHelper/setUpResponseHelper";
import { setupAutocompleteListeners } from "./autocomplete/setupAutocompleteListeners";
import { setupPromptListener } from "./prompts/setupResponseListener";

console.log("content.js 🚀🚀");

window.addEventListener("load", () => {
  init();
});

function init() {
  setupAutocompleteListeners();
  setupResponseHelper();
  setupPromptListener();
}
