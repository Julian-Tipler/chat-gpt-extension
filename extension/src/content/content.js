import { syncGhostText } from "./ghostText/syncGhostText";
import { resetAutocompleteText } from "./autocomplete/resetAutocompleteText";
import { processStream } from "./autocomplete/helpers/processStream";
import { addAutocompleteTextToTextArea } from "./autocomplete/addAutocompleteTextToTextArea";
import FetchController from "./autocomplete/FetchController";
import { fetchStates } from "./autocomplete/constants/fetchStates";
import { addPrompt } from "./prompts/addPrompt";

console.log("content.js 🚀");
const apiUrl = import.meta.env.VITE_API_URL + "/functions/v1/autocomplete";
const accessToken = import.meta.env.VITE_WISE_API_TOKEN;

window.addEventListener("load", () => {
  // existing elements
  const textarea = document.querySelector("textarea");
  const parent = textarea ? textarea.parentElement : null;
  const form = document.querySelector("form");

  // create new elements
  const wiseTextarea = document.createElement("div");
  wiseTextarea.classList.add("wise-textarea");
  wiseTextarea.setAttribute("contenteditable", "true");
  parent.appendChild(wiseTextarea);

  const ghostText = document.createElement("span");
  ghostText.id = "ghost-text";
  wiseTextarea.appendChild(ghostText);

  const autocompleteText = document.createElement("span");
  autocompleteText.id = "autocomplete-text";
  wiseTextarea.appendChild(autocompleteText);
  // textarea and wiseTextarea are now siblings

  const fetchController = new FetchController();

  // Check if a textarea element was found and set listeners
  if (textarea && parent && form) {
    setListeners({ textarea, wiseTextarea, parent, form });
  } else {
    console.log("No textarea found on the page.");
  }

  function setListeners({ textarea, wiseTextarea, form }) {
    // Resets the lastInput, wiseTextarea, and fetchState
    textarea.addEventListener("input", () => {
      // autocomplete
      // fetchController.controller.abort();
      // fetchController.controller = new AbortController();
      fetchController.reset();
      resetAutocompleteText({ autocompleteText });

      // ghost
      syncGhostText({ textarea, ghostText });
    });
    textarea.addEventListener("scroll", function() {
      // both
      wiseTextarea.style.transform = "translateY(" + -this.scrollTop + "px)";
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        addAutocompleteTextToTextArea({
          textarea,
          autocompleteText,
        });
        //make this fetch controller later  controller.abort();
        fetchController.controller.abort();
        fetchController.controller = new AbortController();
      }
      if (e.keyCode === 13) {
        // autocomplete
        fetchController.controller.abort();
        fetchController.controller = new AbortController();
        resetAutocompleteText({ autocompleteText });
      }
    });
    form.addEventListener("submit", () => {
      // autocomplete
      fetchController.reset();
      resetAutocompleteText({ autocompleteText });
      // ghost (none)
    });
    setInterval(async () => {
      if (
        // it has been 1 second since last input
        Date.now() - fetchController.lastInput >= 200 &&
        // and fetch state is idle
        fetchController.fetchState === fetchStates.idle &&
        // there is more than 10 characters in the textarea
        textarea.value.length > 10
      ) {
        // autocomplete
        fetchController.controller.abort();
        fetchController.controller = new AbortController();
        fetchController.fetchState = fetchStates.fetching;

        const { body, aborted, error } = await fetchAutocomplete({
          textarea,
          controller: fetchController.controller,
        });

        if (aborted) {
          console.log("aborted!!");
          return;
        } else if (error) {
          console.log("error!!");
          console.error(error);
          return;
        }

        if (fetchController.fetchState === fetchStates.idle) {
          // do nothing with the response
          return;
        }
        processStream({ body, autocompleteText, textarea });

        fetchController.fetchState = fetchStates.fetched;
        textarea.classList.add("expanded-textarea");
        wiseTextarea.classList.add("expanded-textarea");
      }
    }, 200);
  }
});

// Resets any spans and then updates the innerText to match the wiseTextarea text
// TODO maybe I should include space/paragraph logic here?

async function fetchAutocomplete({ textarea, controller }) {
  const content = textarea.textContent;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
    signal: controller.signal,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.name === `AbortError`) {
        return { aborted: true };
      }
      return { error: error.message };
    });
}

//

//

//

//

//

// PROMPTS
chrome.runtime.onMessage.addListener(function(request) {
  switch (request.action) {
    case "changeText":
      addPrompt(request.text);
      break;
  }
});
