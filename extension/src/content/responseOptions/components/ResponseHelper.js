import { showToast } from "../../components/toast";
import { copyIcon, explainIcon } from "../../icons";
import "./ResponseHelper.css";

export function ResponseHelper(text) {
  const render = () => {
    const responseHelper = document.createElement("div");
    responseHelper.classList.add("response-helper");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    responseHelper.addEventListener("mouseenter", () => {
      buttonContainer.style.visibility = "visible";
      buttonContainer.style.width = "22px";
      responseHelper.style.opacity = "1";
      responseHelper.style.minHeight = "100px";
    });
    responseHelper.addEventListener("mouseleave", () => {
      buttonContainer.style.visibility = "hidden";
      buttonContainer.style.width = "0px";
      responseHelper.style.opacity = "0.1";
      responseHelper.style.minHeight = "0px";
    });

    const explainButton = ExplainButton(text).render();
    addButtonClickAnimation(explainButton);
    buttonContainer.appendChild(explainButton);

    const copyButton = CopyButton(text).render();
    addButtonClickAnimation(copyButton);
    buttonContainer.appendChild(copyButton);

    responseHelper.appendChild(buttonContainer);

    return responseHelper;
  };

  return { render };
}

const ExplainButton = (text) => {
  const render = () => {
    const explainButton = document.createElement("button");
    explainButton.classList.add("explain-button", "response-helper-button");
    explainButton.innerHTML = explainIcon;

    explainButton.onclick = (e) => {
      e.preventDefault();
      const textarea = document.querySelector("textarea");
      if (textarea) {
        const currentText = textarea.value.trim();
        if (currentText !== "") {
          textarea.value += "\n\n" + "Please explain further:" + "\n\n" + text;
        } else {
          textarea.value += "Please explain further:" + "\n\n" + text;
        }
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        const submitButton = document.querySelector(
          "button[data-testid=send-button]"
        );
        if (submitButton) {
          submitButton.click();
        }
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
    copyButton.classList.add("copy-button", "response-helper-button");
    copyButton.innerHTML = copyIcon;
    copyButton.addEventListener("click", () => showToast("Copied to clipboard!"));

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
