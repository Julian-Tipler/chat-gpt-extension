//
import { Prompts } from "./Prompts";
import "./PromptsPage.css";

export type Prompt = {
  id: string;
  name: string;
  text: string;
};

export const PromptsPage = () => {
  return (
    <div className="prompt-container">
      <Prompts />
    </div>
  );
};
