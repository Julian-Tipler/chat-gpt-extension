import React from "react";
import { Prompt } from "../views/Main";
import { usePrompts } from "../contexts/PromptsContext";

export const Prompts = () => {
  const { prompts } = usePrompts();

  if (prompts.length === 0) return <div>No prompts</div>;
  return (
    <div className="prompts-container">
      {prompts.map((prompt, index) => (
        <Prompt key={index} prompt={prompt} />
      ))}
    </div>
  );
};

const Prompt = ({ prompt }: { prompt: Prompt }) => {
  const { deletePrompt } = usePrompts();

  const handleDelete = ({
    e,
    promptId,
  }: {
    e: React.MouseEvent<HTMLElement, MouseEvent>;
    promptId: string;
  }) => {
    e.preventDefault();
    deletePrompt(promptId);
  };

  return (
    <div className="prompt-container">
      <div className={"prompt-name"}>{prompt.name}</div>
      <div className={"prompt-icon-container"}>
        <button
          id={`prompt-${prompt.id}`}
          className={"clickable-button copy-button"}
          onClick={(e) => handlePaste({ e, prompt })}
        >
          <i className="fas fa-copy" />
        </button>
        <button
          id={`prompt-${prompt.id}`}
          className={"clickable-button copy-button"}
          onClick={(e) => handleDelete({ e, promptId: prompt.id })}
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  );
};

const handlePaste = ({
  e,
  prompt,
}: {
  e: React.MouseEvent<HTMLElement, MouseEvent>;
  prompt: Prompt;
}) => {
  e.preventDefault();
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs[0] && tabs[0].id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeText",
        text: prompt.text,
      });
    }
  });
};
