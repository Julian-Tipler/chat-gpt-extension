import { openFormButton } from "./components/openFormButton.js";
import { readAndDisplayPrompts } from "./prompts/readAndDisplayPrompts.js";

document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM loaded! 🚀");
  await readAndDisplayPrompts();
  openFormButton();
});
