import { expandTextareas } from "../ghostText/expandTextareas";
import { syncGhostText } from "../ghostText/syncGhostText";
import FetchController from "./FetchController";
import { addAutocompleteTextToTextArea } from "./addAutocompleteTextToTextArea";
import { fetchStates } from "./constants/fetchStates";
import { processStream } from "./helpers/processStream";
import { resetAutocompleteText } from "./helpers/resetAutocompleteText";

const apiUrl = import.meta.env.VITE_API_URL + "/functions/v1/autocomplete";
const accessToken = import.meta.env.VITE_WISE_API_TOKEN;

export const setupAutocompleteListeners = () => {
  // Existing ChatGPT elements
  const textarea = document.querySelector("textarea");
  const parent = textarea ? textarea.parentElement : null;
  const form = document.querySelector("form");

  // Create new Wise elements
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

  const fetchController = new FetchController();

  // Check if a textarea element was found and set listeners
  if (textarea && parent && form) {
    setAutocompleteListeners({
      textarea,
      wiseTextarea,
      parent,
      form,
    });
  } else {
    console.log("No textarea found on the page.");
  }

  // Sets listeners for autocomplete functionality
  function setAutocompleteListeners({ textarea, wiseTextarea, form }) {
    // Resets the lastInput, wiseTextarea, and fetchState
    textarea.addEventListener("scroll", function() {
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
        fetchController.reset();
      }
      if (e.keyCode === 13) {
        fetchController.reset();
        resetAutocompleteText({ autocompleteText });
      }
    });
    form.addEventListener("submit", () => {
      fetchController.reset();
      resetAutocompleteText({ autocompleteText });
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
};

async function maybeFetchAutocomplete({
  textarea,
  fetchController,
  autocompleteText,
  wiseTextarea,
}) {
  if (
    // it has been 1 second since last input
    Date.now() - fetchController.lastInput >= 200 &&
    // and fetch state is idle
    fetchController.fetchState === fetchStates.idle &&
    // and there are more than 10 characters in the textarea
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
