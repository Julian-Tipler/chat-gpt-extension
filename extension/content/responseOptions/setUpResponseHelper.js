import { ResponseHelper } from "./components/ResponseHelper";

export const setUpResponseHelper = () => {
  const main = document.querySelector("main");
  const config = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
  };

  const observer = new MutationObserver(callback);
  observer.observe(main, config);
};

const callback = function(mutationsList) {
  for (const mutation of mutationsList) {
    handleExistingMessages(mutation);
    handleNewMessage(mutation);
  }
};

const handleExistingMessages = (mutation) => {
  if (mutation.type === "childList") {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.querySelectorAll) {
        const matchingDescendants = node.querySelectorAll(
          'div[data-message-author-role="assistant"]'
        );
        matchingDescendants.forEach((descendant) => {
          // Prevents the responseHelper from causing overflow
          descendant.style.overflowX = "visible";
          const firstChild = descendant.firstChild;
          if (!firstChild) return;
          addResponseHelper(firstChild);
        });
      }
    });
  }
};

const handleNewMessage = (mutation) => {
  if (mutation.type === "attributes" && mutation.attributeName === "class") {
    const firstChild = mutation.target;
    firstChild;
    // Checks if the result has streamed and the responseHelper can be added
    if (
      mutation.oldValue.split(" ").includes("result-streaming") &&
      !firstChild.classList.contains("result-streaming")
    ) {
      addResponseHelper(firstChild);
    }
  }
};

const addResponseHelper = (firstChild) => {
  const paragraphs = firstChild.querySelectorAll("p");
  paragraphs.forEach((p) => {
    if (p.nodeName === "P") {
      // Create a button absolutely positioned right of the paragraph
      p.style.position = "relative";
      p.style.overflow = "visible";
      const sidebar = ResponseHelper(p.textContent);
      p.appendChild(sidebar.render());
    }
  });
};
