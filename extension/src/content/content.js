console.log("content.js 🚀");
import { syncGhostText } from "./ghostText/syncGhostText";

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

  let lastInput = Date.now();
  const fetchStates = {
    idle: "idle",
    fetching: "fetching",
    fetched: "fetched",
    error: "error",
  };
  let fetchState = fetchStates.idle;
  let controller = new AbortController();

  const debuggingLogger = (text) => {
    text && console.log(text);
    console.log(fetchState);
  };

  // Check if a textarea element was found and set listeners
  if (textarea && parent && form) {
    setListeners({ textarea, wiseTextarea, parent, form });
  } else {
    console.log("No textarea found on the page.");
  }

  function setListeners({ textarea, wiseTextarea, form }) {
    // Resets the lastInput, wiseTextarea, and fetchState
    textarea.addEventListener("input", () => {
      lastInput = Date.now();

      // This deletes the existing autocompleteText
      syncGhostText({ textarea, ghostText });
      autocompleteText.innerText = "";
      fetchState = fetchStates.idle;
    });
    textarea.addEventListener("scroll", function() {
      wiseTextarea.style.transform = "translateY(" + -this.scrollTop + "px)";
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        textarea.value += autocompleteText.innerText;
        autocompleteText.innerText = "";
        // This input should reset the wiseTextarea, deleting the span in the process
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        textarea.focus();
      }
      if (e.keyCode === 13) {
        controller.abort();
        console.log("enter pushed");
        autocompleteText.innerText = "";
      }
    });
    form.addEventListener("submit", () => {
      console.log("SUBMIT");

      lastInput = Date.now();

      // TODO it appears that some ghostText may remain
      resetWiseTextarea({ autocompleteText, ghostText });
      fetchState = fetchStates.idle;
    });
    setInterval(async () => {
      if (
        // it has been 1 second since last input
        Date.now() - lastInput >= 200 &&
        // and fetch state is idle
        fetchState === fetchStates.idle &&
        // there is more than 10 characters in the textarea
        wiseTextarea.innerHTML.length > 10
      ) {
        controller.abort();
        controller = new AbortController();

        fetchState = fetchStates.fetching;
        debuggingLogger("before fetchAutocomplete event");
        const fetchedAutocompleteText = await fetchAutocomplete({
          textarea,
          controller,
        });
        debuggingLogger("after fetchAutocomplete event");
        if (fetchState === fetchStates.idle) {
          // do nothing with the response
          return;
        }
        if (fetchedAutocompleteText) {
          fetchState = fetchStates.fetched;
          let newAutocompleteText = fetchedAutocompleteText;

          if (textarea.textContent.slice(-1) !== " ") {
            newAutocompleteText = " " + newAutocompleteText;
          }
          autocompleteText.textContent = newAutocompleteText;

          textarea.classList.add("expanded-textarea");
          wiseTextarea.classList.add("expanded-textarea");
        } else {
          fetchState = fetchStates.error;
        }
      }
    }, 200);
  }
});

// Resets any spans and then updates the innerText to match the wiseTextarea text
// TODO maybe I should include space/paragraph logic here?

const resetWiseTextarea = ({ autocompleteText, ghostText }) => {
  ghostText.innerText = "";
  autocompleteText.innerText = "";
};

async function fetchAutocomplete({ textarea, controller }) {
  const apiUrl = import.meta.env.VITE_API_URL + "/functions/v1/autocomplete";

  const accessToken = import.meta.env.VITE_WISE_API_TOKEN;
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
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.autocomplete;
    })
    .catch((error) => {
      if (error.name === `AbortError`) {
        console.log(`--fetch aborted--`);
        return;
      }
      console.error("error", error);
    });
}

//

//

//

//

//

// PROMPTS
chrome.runtime.onMessage.addListener(function(request) {
  console.log("request", request);
  switch (request.action) {
    case "changeText":
      changeText(request.text);
      break;
  }
});

function changeText(text) {
  const textarea = document.querySelector("textarea");
  if (textarea) {
    const currentText = textarea.value.trim();
    if (currentText !== "") {
      textarea.value += "\n\n" + text;
    } else {
      textarea.value += text;
    }
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
  }
}
