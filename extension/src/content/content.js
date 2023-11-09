console.log("Hello from content.js");

window.addEventListener("load", () => {
  //existing elements
  const textarea = document.querySelector("textarea");
  const container = textarea ? textarea.parentElement : null;
  const form = document.querySelector("form");

  //create new elements
  const ghostTextarea = document.createElement("div");
  ghostTextarea.classList.add("ghost-textarea");
  ghostTextarea.setAttribute("contenteditable", "true");
  container.appendChild(ghostTextarea);

  ghostTextarea.innerHTML = "";
  let lastInput = Date.now();
  let fetchState = "idle";

  // Check if a textarea element was found
  if (textarea && container && form) {
    setListeners({ textarea, ghostTextarea, container, form });
  } else {
    console.log("No textarea found on the page.");
  }

  function setListeners({ textarea, ghostTextarea, form }) {
    textarea.addEventListener("input", () => {
      // console.log("input detected");
      fetchState = "idle";
      const newText = textarea.value.replace(/\n/g, "<br>");
      ghostTextarea.innerHTML = newText;
      lastInput = Date.now();
    });
    form.addEventListener("submit", () => {
      // console.log("form submitted");
      fetchState = "idle";
      ghostTextarea.innerHTML = "";
    });
    setInterval(async () => {
      if (
        // it has been 1 second since last input
        Date.now() - lastInput > 500 &&
        // and fetch state is idle
        fetchState === "idle" &&
        // there is more than 10 characters in the textarea
        ghostTextarea.innerHTML.length > 10
      ) {
        fetchState = "fetching";
        const autocompleteText = await fetchAutocomplete({
          fetchState,
          textarea,
        });
        if (autocompleteText) {
          fetchState = "fetched";
        } else {
          fetchState = "error";
        }
        const autocompleteTextContainer = document.createElement("span");
        autocompleteTextContainer.id = "autocomplete-text";
        autocompleteTextContainer.textContent = autocompleteText;
        ghostTextarea.appendChild(autocompleteTextContainer);
      }
    }, 200);
  }
});

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
