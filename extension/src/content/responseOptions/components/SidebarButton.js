import "./SidebarButton.css";

export function Sidebar(text) {
  const render = () => {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    sidebar.addEventListener("mouseenter", () => {
      buttonContainer.style.visibility = "visible";
      sidebar.style.opacity = "1";
      sidebar.style.minHeight = "100px";
      buttonContainer.style.width = "20px";
    });
    sidebar.addEventListener("mouseleave", () => {
      buttonContainer.style.visibility = "hidden";
      sidebar.style.opacity = "0.5";
      sidebar.style.minHeight = "0px";
      buttonContainer.style.width = "0px";
    });

    const explainButton = ExplainButton(text).render();
    addButtonClickAnimation(explainButton);
    buttonContainer.appendChild(explainButton);

    const copyButton = CopyButton(text).render();
    addButtonClickAnimation(copyButton);
    buttonContainer.appendChild(copyButton);

    sidebar.appendChild(buttonContainer);

    return sidebar;
  };

  return { render };
}

const ExplainButton = (text) => {
  const render = () => {
    const explainButton = document.createElement("button");
    explainButton.classList.add("explain-button");

    explainButton.onclick = (e) => {
      e.preventDefault();
      const textarea = document.querySelector("textarea");
      if (textarea) {
        const currentText = textarea.value.trim();
        if (currentText !== "") {
          textarea.value += "\n\n" + "Tell me more:" + "\n\n" + text;
        } else {
          textarea.value += "Tell me more:" + "\n\n" + text;
        }
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        textarea.focus();
      }
    };
    return explainButton;
  };
  return { render };
};

const CopyButton = (text) => {
  const render = () => {
    const copyButton = document.createElement("button");
    copyButton.classList.add("copy-button");
    const icon = document.createElement("i");
    icon.classList.add("button-icon", "fas", "fa-copy");
    copyButton.appendChild(icon);

    copyButton.onclick = (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(text);
    };
    return copyButton;
  };
  return { render };
};

const addButtonClickAnimation = (button) => {
  button.addEventListener("click", (e) => {
    const button = e.currentTarget;
    button.style.transform = "scale(0.95)";
    button.style.transition = " transform 0.1s ease";
    setTimeout(() => {
      button.style.transform = "scale(1)";
      button.style.transition = " transform 0.3s ease";
    }, 150);
  });
};
