import React, { useState } from "react";
import { Prompt, Prompt as PromptType } from "./PromptsPage";
import { usePrompts } from "../../contexts/PromptsContext";
import { colors } from "../../theme";
import { PromptModal } from "./PromptModal";
import "./Prompts.css";

export const Prompts = () => {
  const { prompts } = usePrompts();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editedPrompt, setEditedPrompt] = useState<PromptType | null>(null);
  return (
    <div className="item-and-button-container">
      <div className="item-container">
        {prompts.map((prompt, index) => (
          <Prompt
            key={index}
            prompt={prompt}
            setEditedPrompt={setEditedPrompt}
            setShowForm={setShowForm}
          />
        ))}
      </div>
      <PlusButton setShowForm={setShowForm} setEditedPrompt={setEditedPrompt} />
      {showForm && <PromptModal
        setShowForm={setShowForm}
        editedPrompt={editedPrompt}
      />}
    </div>
  );
};

const Prompt = ({
  prompt,
  setEditedPrompt,
  setShowForm,
}: {
  prompt: PromptType;
  setEditedPrompt: React.Dispatch<React.SetStateAction<Prompt | null>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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

  const handleEdit = ({
    e,
  }: {
    e: React.MouseEvent<HTMLElement, MouseEvent>;
  }) => {
    e.preventDefault();
    setEditedPrompt(prompt);
    setShowForm(true);
  };

  return (
    <div className="item">
      <div className={"prompt-name"}>{prompt.name}</div>
      <div className={"item-buttons"}>
        <button
          id={`prompt-${prompt.id}`}
          className={"prompt-button"}
          onClick={(e) => handlePaste({ e, prompt })}
        >
          <i className="fas fa-copy" />
        </button>
        <button
          id={`prompt-${prompt.id}`}
          className={"prompt-button"}
          onClick={(e) => handleDelete({ e, promptId: prompt.id })}
        >
          <i className="fas fa-trash" />
        </button>
        <button
          id={`prompt-${prompt.id}`}
          className={"prompt-button"}
          onClick={(e) => handleEdit({ e })}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    </div>
  );
};

const PlusButton = ({
  setShowForm,
  setEditedPrompt,
}: {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedPrompt: React.Dispatch<React.SetStateAction<Prompt | null>>;
}) => {
  return (
    <button
      onClick={() => {
        setShowForm(true);
        setEditedPrompt(null);
      }}
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
        width: "1.25rem",
        fontSize: "10 px",
        lineHeight: 1,
        cursor: "pointer",
        textAlign: "center",
        outline: "none",
        alignContent: "center",
        flexShrink: 0,
        margin: "0.5rem",
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
  prompt: PromptType;
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
