//
import { Prompts } from "./Prompts";
import { Flex } from "@chakra-ui/layout";

export type Prompt = {
  id: string;
  name: string;
  text: string;
};

export const PromptsPage = () => {
  return (
    <Flex
      className="prompt-container"
      flexDir={"column"}
      justifyContent={"center"}
      flex={1}
      padding={"20px"}
      backgroundColor={"brand.background"}
      borderRadius={"0.5rem"}
      overflow={"hidden"}
    >
      <Prompts />
    </Flex>
  );
};
