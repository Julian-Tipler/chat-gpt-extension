import React from "react";
import { Prompt } from "./PromptsPage";
import { usePrompts } from "../../contexts/PromptsContext";
import { Flex } from "@chakra-ui/layout";
import { colors } from "../../theme";
import { useDisclosure } from "@chakra-ui/hooks";
import { NewPromptModal } from "./NewPromptModal";

export const Prompts = () => {
  const { prompts } = usePrompts();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      className="item-and-button-container"
      bgColor={"brand.cardBackground"}
      borderRadius={"0.25rem"}
      flexDirection={"column"}
      flex={1}
      overflow={"hidden"}
    >
      <Flex
        className="item-container"
        flexDir={"column"}
        gap={"0.25rem"}
        flex={1}
        padding={"0.25rem"}
        overflow={"scroll"}
      >
        {prompts.map((prompt, index) => (
          <Prompt key={index} prompt={prompt} />
        ))}
      </Flex>
      <NewPromptModal isOpen={isOpen} onClose={onClose} />
      <PlusButton onOpen={onOpen} />
    </Flex>
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
    <Flex
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"0.5rem"}
      borderRadius={"0.5rem"}
      bgColor={"brand.background"}
    >
      <div className={"prompt-name"}>{prompt.name}</div>
      <Flex gap={"0.25rem"}>
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
      </Flex>
    </Flex>
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
        action: "changeText",
        text: prompt.text,
      });
    }
  });
};
