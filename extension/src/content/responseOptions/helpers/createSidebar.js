export const createSidebar = (p) => {
  const sideBar = createSidebarButton(p);
  return sideBar;
};

const createSidebarButton = (p) => {
  const sideBar = document.createElement("button");
  // Apply initial styles
  sideBar.style.padding = "0px 2px";
  sideBar.style.border = "none";
  sideBar.style.backgroundColor = "#007bff";
  sideBar.style.color = "white";
  sideBar.style.cursor = "pointer";
  sideBar.style.transition = "background-color 0.3s ease";
  sideBar.style.position = "absolute";
  sideBar.style.top = 0;
  sideBar.style.bottom = 0;
  sideBar.style.right = 0;
  console.log(sideBar);

  const buttonContainer = document.createElement("div");
  sideBar.appendChild(buttonContainer);
  buttonContainer.style.display = "none";
  buttonContainer.style.flexDirection = "column";
  buttonContainer.style.justifyContent = "space-between";
  buttonContainer.style.alignItems = "center";
  console.log(buttonContainer);

  const text = p.textContent;

  buttonContainer.appendChild(createCopyButton());
  buttonContainer.appendChild(createExplainButton(text));

  const changeColorOnHover = (element, hoverColor, originalColor) => {
    element.addEventListener("mouseenter", () => {
      element.style.backgroundColor = hoverColor;
      buttonContainer.style.display = "flex";
    });
    element.addEventListener("mouseleave", () => {
      element.style.backgroundColor = originalColor;
      buttonContainer.style.display = "none";
    });
  };
  changeColorOnHover(sideBar, "#0056b3", "#007bff");
  return sideBar;
};

const createCopyButton = () => {
  // Create a circular green button with a white plus sign
  const copyButton = document.createElement("button");
  copyButton.style.padding = "5px 5px";
  copyButton.style.border = "none";
  copyButton.style.backgroundColor = "green";
  copyButton.style.color = "white";
  copyButton.style.cursor = "pointer";
  copyButton.style.transition = "background-color 0.3s ease";
  copyButton.style.position = "absolute";
  copyButton.style.top = 0;
  copyButton.style.right = 0;

  copyButton.onclick = (e) => {
    e.preventDefault();
    console.log("copy button clicked");
  };
  return copyButton;
};

const createExplainButton = (text) => {
  // Create a circular yellow button with a white question mark
  const explainButton = document.createElement("button");
  explainButton.style.padding = "5px 5px";
  explainButton.style.border = "none";
  explainButton.style.backgroundColor = "yellow";
  explainButton.style.color = "white";
  explainButton.style.cursor = "pointer";
  explainButton.style.transition = "background-color 0.3s ease";
  explainButton.style.position = "absolute";
  explainButton.style.bottom = 0;
  explainButton.style.right = 0;

  explainButton.onclick = (e) => {
    e.preventDefault();
    console.log(text);
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
  };
  return explainButton;
};
