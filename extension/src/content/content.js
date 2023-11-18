console.log("content.js 🚀");

window.addEventListener("load", () => {
  // existing elements
  const textarea = document.querySelector("textarea");
  const parent = textarea ? textarea.parentElement : null;
  const form = document.querySelector("form");

  // create new elements
  const ghostTextarea = document.createElement("div");
  ghostTextarea.classList.add("ghost-textarea");
  ghostTextarea.setAttribute("contenteditable", "true");
  parent.appendChild(ghostTextarea);
  // textarea and ghostTextarea are now siblings

  let lastInput = Date.now();
  const fetchStates = {
    idle: "idle",
    fetching: "fetching",
    fetched: "fetched",
    error: "error",
  };
  let fetchState = fetchStates.idle;

  let autocompleteText = "";

  const debuggingLogger = (text) => {
    text && console.log(text);
    console.log(fetchState);
  };

  // Check if a textarea element was found and set listeners
  if (textarea && parent && form) {
    setListeners({ textarea, ghostTextarea, parent, form });
  } else {
    console.log("No textarea found on the page.");
  }

  function setListeners({ textarea, ghostTextarea, form }) {
    // Resets the lastInput, ghostTextarea, and fetchState
    textarea.addEventListener("input", () => {
      lastInput = Date.now();

      // This deletes the existing autocompleteTextContainer
      syncGhostTextarea({ textarea, ghostTextarea });
      fetchState = fetchStates.idle;
    });
    textarea.addEventListener("scroll", function() {
      ghostTextarea.style.transform = "translateY(" + -this.scrollTop + "px)";
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        textarea.value += autocompleteText;
        autocompleteText = "";
        // This input should reset the ghostTextarea, deleting the span in the process
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        textarea.focus();
        debuggingLogger("keydown (tab) event");
      }
    });
    form.addEventListener("submit", () => {
      debuggingLogger("submit event");

      lastInput = Date.now();

      // TODO it appears that some ghostText may remain
      resetGhostTextarea({ ghostTextarea });
      fetchState = fetchStates.idle;
    });
    setInterval(async () => {
      if (
        // it has been 1 second since last input
        Date.now() - lastInput >= 200 &&
        // and fetch state is idle
        fetchState === fetchStates.idle &&
        // there is more than 10 characters in the textarea
        ghostTextarea.innerHTML.length > 10
      ) {
        fetchState = fetchStates.fetching;
        debuggingLogger("before fetchAutocomplete event");
        const fetchedAutocompleteText = await fetchAutocomplete({
          textarea,
        });
        debuggingLogger("after fetchAutocomplete event");
        if (fetchState === fetchStates.idle) {
          // do nothing with the response
          return;
        }
        if (fetchedAutocompleteText) {
          fetchState = fetchStates.fetched;
          autocompleteText = fetchedAutocompleteText;
          const autocompleteTextContainer = document.createElement("span");
          autocompleteTextContainer.id = "autocomplete-text";
          if (textarea.textContent.slice(-1) !== " ") {
            autocompleteText = " " + autocompleteText;
          }
          autocompleteTextContainer.textContent = autocompleteText;

          // <add code here that checks for the last character of textarea and adds a space if it's not a space>
          ghostTextarea.appendChild(autocompleteTextContainer);
          textarea.classList.add("expanded-textarea");
          ghostTextarea.classList.add("expanded-textarea");
        } else {
          fetchState = fetchStates.error;
        }
      }
    }, 200);
  }
});

// Resets any spans and then updates the innerText to match the ghostTextarea text
// TODO maybe I should include space/paragraph logic here?
const syncGhostTextarea = ({ textarea, ghostTextarea }) => {
  ghostTextarea.innerHTML = "";
  ghostTextarea.innerText = textarea.value;
};

const resetGhostTextarea = ({ ghostTextarea }) => {
  ghostTextarea.innerHTML = "";
};

async function fetchAutocomplete({ textarea }) {
  const apiUrl =
    "https://cgkxgakdjiogfenpxrxi.supabase.co/functions/v1/autocomplete?userId=a4e36a9e-cc7b-4a17-9812-0c71ed69b8c3";
  const accessToken = import.meta.env.VITE_WISE_API_TOKEN;
  const content = textarea.textContent;
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data.autocomplete;
    })
    .catch((error) => {
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
