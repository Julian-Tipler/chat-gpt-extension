export function Sidebar(text) {
  const render = () => {
    const sideBar = document.createElement("button");
    // Apply initial styles
    sideBar.style.border = "1px solid #007bff";
    sideBar.style.color = "white";
    sideBar.style.cursor = "pointer";
    sideBar.style.transition = "background-color 0.3s ease";
    sideBar.style.position = "absolute";
    sideBar.style.top = 0;
    sideBar.style.right = 0;
    sideBar.style.height = "100%";
    sideBar.style.width = "10px";

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "none";
    buttonContainer.style.flexDirection = "column";
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.width = "10px";
    sideBar.addEventListener("mouseenter", () => {
      buttonContainer.style.display = "flex";
    });
    sideBar.addEventListener("mouseleave", () => {
      buttonContainer.style.display = "none";
    });

    const explainButton = ExplainButton(text);
    buttonContainer.appendChild(explainButton.render());

    const copyButton = CopyButton();
    buttonContainer.appendChild(copyButton.render());

    sideBar.appendChild(buttonContainer);
    // const text = document.createTextNode(text);
    // sideBar.appendChild(text);

    return sideBar;
  };

  return { render };
}

const ExplainButton = (text) => {
  const render = () => {
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
  return { render };
};

const CopyButton = () => {
  const render = () => {
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
    };
    return copyButton;
  };
  return { render };
};
