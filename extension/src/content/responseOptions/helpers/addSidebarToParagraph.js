import { Sidebar } from "../components/SidebarButton";

export const addSidebarToParagraph = (p) => {
  p.style.position = "relative";
  const sidebar = Sidebar(p.textContent);
  p.appendChild(sidebar.render());
};
