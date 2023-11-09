//
import { Title } from "../../components/Title";
import { FormContainer } from "../../components/Form";
import { Prompts } from "./PromptsForm";
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
      width={"300px"}
      padding={"20px"}
      backgroundColor={"#444654"}
      borderRadius={"0.5em"}
    >
      <Title />
      <FormContainer />
      <Prompts />
    </Flex>
  );
};
