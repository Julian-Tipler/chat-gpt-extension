import { addSidebarToParagraph } from "./helpers/addSidebarToParagraph";

export const setUpResponseHighlighting = () => {
  // Need to do a mutation observer that checks if new paragraphs are added.
  // If they are, append the clickable button to those paragraphs

  // Fetch main element
  const main = document.querySelector("main");
  const config = { childList: true, subtree: true };

  // Finds all divs with role of assistant
  const callback = function(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.querySelectorAll) {
            const matchingDescendants = node.querySelectorAll(
              'div[data-message-author-role="assistant"]'
            );
            matchingDescendants.forEach((descendant) => {
              const firstChild = descendant.firstChild;
              // Iterate through descendents of firstChild
              firstChild.childNodes.forEach((p) => {
                if (p.nodeName === "P") {
                  // Create a button absolutely positioned right of the paragraph
                  addSidebarToParagraph(p);
                }
              });
            });
          }
        });
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(main, config);

  // select div where role is presentation
};
