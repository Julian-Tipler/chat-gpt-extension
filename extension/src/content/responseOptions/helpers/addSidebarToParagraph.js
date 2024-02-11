import { createSidebar } from "./createSidebar";

export const addSidebarToParagraph = (p) => {
  p.style.position = "relative";

  const sidebar = createSidebar(p);
  sidebar.onclick = onClick;

  // Apply the hover effect
  p.appendChild(sidebar);
};

const onClick = (e) => {
  e.preventDefault();
  console.log("button clicked");
};
