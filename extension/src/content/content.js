import { syncGhostText } from "./ghostText/syncGhostText";
import { resetAutocompleteText } from "./autocomplete/resetAutocompleteText";
import { processStream } from "./autocomplete/helpers/processStream";
import { addAutocompleteTextToTextArea } from "./autocomplete/addAutocompleteTextToTextArea";
import FetchController from "./autocomplete/FetchController";
import { fetchStates } from "./autocomplete/constants/fetchStates";
import { addPrompt } from "./prompts/addPrompt";
import { expandTextareas } from "./ghostText/expandTextareas";

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
    textarea.addEventListener("scroll", function() {
      // both
      wiseTextarea.style.transform = "translateY(" + -this.scrollTop + "px)";
    });
    textarea.addEventListener("input", () => {
      fetchController.reset();
      resetAutocompleteText({ autocompleteText });

      syncGhostText({ textarea, ghostText });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        addAutocompleteTextToTextArea({
          textarea,
          autocompleteText,
        });
        //make this fetch controller later  controller.abort();
        fetchController.reset();
      }
      if (e.keyCode === 13) {
        // autocomplete
        // fetchController.controller.abort();
        // fetchController.controller = new AbortController();
        fetchController.reset();
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
      await maybeFetchAutocomplete({
        textarea,
        fetchController,
        autocompleteText,
        wiseTextarea,
      });
    }, 200);
  }
});

// Resets any spans and then updates the innerText to match the wiseTextarea text
// TODO maybe I should include space/paragraph logic here?

async function maybeFetchAutocomplete({
  textarea,
  fetchController,
  autocompleteText,
  wiseTextarea,
}) {
  // console.log(
  //   Date.now() - fetchController.lastInput >= 200,
  //   fetchController.fetchState,
  //   textarea.value.length > 10
  // );
  if (
    // it has been 1 second since last input
    Date.now() - fetchController.lastInput >= 200 &&
    // and fetch state is idle
    fetchController.fetchState === fetchStates.idle &&
    // there is more than 10 characters in the textarea
    textarea.value.length > 10
  ) {
    fetchController.startFetch();
    const { body, aborted, error } = await fetchAutocomplete({
      textarea,
      fetchController,
    });

    if (aborted) {
      return;
    } else if (error) {
      fetchController.fetchError();
      return;
    }

    processStream({ body, autocompleteText, textarea, fetchController });

    fetchController.successfulFetch();
    expandTextareas({ textarea, wiseTextarea });
  }
}

async function fetchAutocomplete({ textarea, fetchController }) {
  const content = textarea.textContent;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
    signal: fetchController.controller.signal,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.name === `AbortError`) {
        return { aborted: true };
      }
      console.error("FETCH regular error", error);
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
    case "addPrompt":
      addPrompt(request.text);
      break;
  }
});