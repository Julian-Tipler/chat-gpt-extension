//
import { Title } from "../../components/Title";
import { FormContainer } from "../../components/Form";
import { Prompts } from "./Prompts";
import { Box, Flex } from "@chakra-ui/layout";

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
      backgroundColor={"#444654"}
      borderRadius={"0.5em"}
      overflowY={"auto"}
      maxHeight={"600px"}
    >
      <Title />
      <Flex
        className={"prompts-container"}
        backgroundColor={"red"}
        flexDir={"column"}
        flex={1}
      >
        <Box backgroundColor={"yellow"} overflow={"auto"}>
          child 1
        </Box>
        <Box backgroundColor={"blue"}>child 2</Box>
      </Flex>
    </Flex>
  );
};

{
  /* <Title />
      <Flex flexDir={"column"} flex={1}>
        <Box overflow={"auto"}>
          <Prompts />
        </Box>
        <Box>
          <FormContainer />
        </Box>
      </Flex> */
}
