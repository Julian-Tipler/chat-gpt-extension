import { ResponseHelper } from "./components/ResponseHelper";

export const setUpResponseHighlighting = () => {
  // Need to do a mutation observer that checks if new paragraphs are added.
  // If they are, append the clickable button to those paragraphs

  const main = document.querySelector("main");
  const config = {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
  };

  const observer = new MutationObserver(callback);
  observer.observe(main, config);

  // also need to observe when a message is finished (results-streaming class disappears)
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
          addResponseHelper(firstChild);
        });
      }
    });
  }
};

const handleNewMessage = (mutation) => {
  // Check for attribute changes which might indicate class changes
  if (mutation.type === "attributes" && mutation.attributeName === "class") {
    const firstChild = mutation.target;
    // Check if the target is a div and if it no longer contains the 'results-streaming' class
    if (
      mutation.oldValue.split(" ").includes("result-streaming") &&
      !firstChild.classList.contains("result-streaming")
    ) {
      addResponseHelper(firstChild);
    }
  }
};

const addResponseHelper = (firstChild) => {
  firstChild.childNodes.forEach((p) => {
    if (p.nodeName === "P") {
      // Create a button absolutely positioned right of the paragraph
      p.style.position = "relative";
      p.style.overflow = "visible";
      const sidebar = ResponseHelper(p.textContent);
      p.appendChild(sidebar.render());
    }
  });
};
