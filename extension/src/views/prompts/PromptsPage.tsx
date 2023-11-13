//
import { Title } from "../../components/Title";
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
      flexDir={"column"}
      className="main-container"
      justifyContent={"center"}
      padding={"20px"}
      backgroundColor={"brand.background"}
      borderRadius={"0.5rem"}
      overflowY={"auto"}
      maxHeight={"600px"}
    >
      <Title />
      <Prompts />
    </Flex>
  );
};
