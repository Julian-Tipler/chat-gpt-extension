import React from "react";
import { Prompt } from "./PromptsPage";
import { usePrompts } from "../../contexts/PromptsContext";
import { colors } from "../../theme";
import { useDisclosure } from "@chakra-ui/hooks";
import { NewPromptModal } from "./NewPromptModal";
import "./Prompts.css";

export const Prompts = () => {
  const { prompts } = usePrompts();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="item-and-button-container">
      <div className="item-container">
        {prompts.map((prompt, index) => (
          <Prompt key={index} prompt={prompt} />
        ))}
      </div>
      <NewPromptModal isOpen={isOpen} onClose={onClose} />
      <PlusButton onOpen={onOpen} />
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
    <div className="item">
      <div className={"prompt-name"}>{prompt.name}</div>
      <div className={"item-buttons"}>
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

const PlusButton = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <button
      onClick={onOpen}
      id={"show-form-button"}
      style={{
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.brand.primary,
        color: colors.text.primary,
        border: "none",
        borderRadius: "50%",
        width: "1.25em",
        height: "1.25em",
        fontSize: "10px",
        lineHeight: 1,
        cursor: "pointer",
        textAlign: "center",
        outline: "none",
        alignContent: "center",
        flexShrink: 0,
      }}
    >
      +
    </button>
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
        action: "addPrompt",
        text: prompt.text,
      });
    }
  });
};
