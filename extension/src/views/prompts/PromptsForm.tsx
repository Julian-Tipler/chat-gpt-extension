import React from "react";
import { Prompt } from "./PromptsPage";
import { usePrompts } from "../../contexts/PromptsContext";
import { Flex } from "@chakra-ui/layout";

export const Prompts = () => {
  const { prompts } = usePrompts();

  if (prompts.length === 0) return <div>No prompts</div>;
  return (
    <Flex
      flexDir={"column"}
      maxH={"16rem"}
      overflow={"scroll"}
      bgColor={"brand.cardBackground"}
      gap={"0.25rem"}
      borderRadius={"0.25rem"}
      padding={"0.25rem"}
    >
      {prompts.map((prompt, index) => (
        <Prompt key={index} prompt={prompt} />
      ))}
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
