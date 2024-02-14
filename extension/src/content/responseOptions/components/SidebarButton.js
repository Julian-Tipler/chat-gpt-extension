import "./SidebarButton.css";
import "./OtherCss.css";

export function Sidebar(text) {
  const render = () => {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.height = "100%";
    buttonContainer.style.overflow = "hidden"; // Hide overflow
    buttonContainer.style.visibility = "hidden";
    buttonContainer.style.flexDirection = "column";
    buttonContainer.style.justifyContent = "space-around";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.width = "0px";
    buttonContainer.style.transition =
      "width 0.3s ease, height 0.3s ease, transform 0.3s ease";

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

    const explainButton = ExplainButton(text);
    buttonContainer.appendChild(explainButton.render());

    const copyButton = CopyButton();
    buttonContainer.appendChild(copyButton.render());

    sidebar.appendChild(buttonContainer);
    // const text = document.createTextNode(text);
    // sidebar.appendChild(text);

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
      console.log(text);
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

const CopyButton = () => {
  const render = () => {
    const copyButton = document.createElement("button");
    copyButton.style.padding = "10px 10px";
    copyButton.style.border = "none";
    copyButton.style.borderRadius = "10px";
    copyButton.style.backgroundColor = "green";
    copyButton.style.color = "white";
    copyButton.style.cursor = "pointer";
    copyButton.style.transition = "background-color 0.3s ease";
    copyButton.style.top = 0;
    copyButton.style.right = 0;

    copyButton.onclick = (e) => {
      e.preventDefault();
    };
    return copyButton;
  };
  return { render };
};
