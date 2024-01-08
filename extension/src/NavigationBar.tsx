import "./NavigationBar.css";
import { Title } from "./components/Title";
const items = [
  {
    text: "Prompts",
    path: "/",
  },
];

export const NavigationBar = () => {
  const { pathname } = useLocation();
  return (
    <div className=".navigation-bar-container">
      <Title />
      <div className="navigation-items-container">
        {items.map((item) => (
          <Item
            key={item.path}
            text={item.text}
            path={item.path}
            selected={pathname === item.path}
          />
        ))}
      </div>
    </div>
  );
};

import { useLocation, useNavigate } from "react-router";

export const Item = ({
  text,
  path,
  selected,
}: {
  text: string;
  path: string;
  selected: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className="navigation-item">
      <button
        onClick={() => navigate(path)}
        className={`.navigation-button ${
          selected ? "navigation-button-selected" : ""
        }}`}
      >
        {text}
      </button>
    </div>
  );
};
